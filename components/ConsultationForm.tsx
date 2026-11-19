'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { sections, type Field } from '@/lib/questions';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

const DRAFT_KEY = 'bengal-industry-consultation-draft-v2';
type Answers = Record<string, string | string[]>;
const CONSENT_VALUE = 'I agree';

function isValidGST(value: string) {
  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(value.trim().toUpperCase());
}

export default function ConsultationForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [submissionToken, setSubmissionToken] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setAnswers(saved.answers || {});
        setSubmissionToken(saved.submissionToken || '');
      }
    } catch { /* Ignore an unreadable local draft. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && !done) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ answers, submissionToken }));
    }
  }, [answers, submissionToken, ready, done]);

  const section = sections[step];
  const progress = Math.round(((step + (showReview ? 1 : 0)) / (sections.length + 1)) * 100);
  const update = (id: string, value: string | string[]) => setAnswers(current => ({ ...current, [id]: value }));
  const toggle = (id: string, value: string, max?: number) => {
    const current = (answers[id] as string[] | undefined) || [];
    if (current.includes(value)) update(id, current.filter(item => item !== value));
    else if (!max || current.length < max) update(id, [...current, value]);
  };

  const missing = useMemo(() => section.fields.filter(field => {
    if (!field.required) return false;
    const value = answers[field.id];
    return !value || (Array.isArray(value) && value.length === 0) || (!Array.isArray(value) && !String(value).trim());
  }), [section, answers]);

  const validateSection = () => {
    if (missing.length) {
      setError('Please complete the required fields before continuing.');
      return false;
    }
    const gst = String(answers.company_gst_number || '').trim().toUpperCase();
    if (step === 0 && gst && !isValidGST(gst)) {
      setError('Please enter a valid 15-character GSTIN.');
      return false;
    }
    const missingOther = section.fields.find(field => {
      if (!field.otherField) return false;
      const selected = answers[field.id];
      return Array.isArray(selected) && selected.includes('Other (please specify)') && !String(answers[field.otherField] || '').trim();
    });
    if (missingOther) {
      setError('Please provide a short description for each selected “Other” option.');
      return false;
    }
    setError('');
    return true;
  };

  const next = () => {
    if (!validateSection()) return;
    setStep(current => Math.min(current + 1, sections.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async () => {
    if (!validateSection()) return;
    if (!isSupabaseConfigured || !supabase) {
      setError('The consultation service is not configured yet. Please try again later.');
      return;
    }
    const token = submissionToken || crypto.randomUUID();
    setSubmissionToken(token);
    setBusy(true);
    setError('');
    try {
      const payload = { ...answers, company_gst_number: String(answers.company_gst_number || '').trim().toUpperCase(), consent_ack: CONSENT_VALUE, submission_token: token };
      const { data, error: submitError } = await supabase.rpc('submit_consultation', { payload });
      if (submitError) throw submitError;
      setDone(data?.submission_id || 'Your submission has been received.');
      localStorage.removeItem(DRAFT_KEY);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Submission could not be completed. Your draft remains saved. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const renderField = (field: Field) => {
    const value = answers[field.id];
    const selected = Array.isArray(value) ? value : [];
    const otherSelected = !!field.otherField && selected.includes('Other (please specify)');
    return <div className="field" key={field.id}>
      {field.type !== 'consent' && <label htmlFor={field.id}>{field.label} {field.required && <span className="required">*</span>}{field.max && <span className="muted" style={{ fontWeight: 400 }}> · Choose up to {field.max}</span>}</label>}
      {field.type === 'textarea' ? <textarea id={field.id} value={String(value || '')} onChange={event => update(field.id, event.target.value)} placeholder="Share your perspective…" />
      : field.type === 'checkbox' ? <>
        <div className="choice-list">{field.options?.map(option => <label className="choice" key={option}>
          <input type="checkbox" checked={selected.includes(option)} onChange={() => toggle(field.id, option, field.max)} />
          <span>{option}</span>
        </label>)}</div>
        {otherSelected && field.otherField && <div className="other-response"><label htmlFor={field.otherField}>Please specify</label><input id={field.otherField} type="text" value={String(answers[field.otherField] || '')} onChange={event => update(field.otherField!, event.target.value)} placeholder="Please describe…" /></div>}
      </>
      : field.type === 'radio' ? <div className="choice-list">{field.options?.map(option => <label className="choice" key={option}><input type="radio" name={field.id} checked={value === option} onChange={() => update(field.id, option)} /><span>{option}</span></label>)}</div>
      : field.type === 'consent' ? <label className="consent-bubble"><input type="checkbox" checked={value === CONSENT_VALUE} onChange={event => update(field.id, event.target.checked ? CONSENT_VALUE : '')} /><span>{field.label} <span className="required">*</span></span></label>
      : <>
        <input id={field.id} type={field.type === 'gst' ? 'text' : field.type} value={String(value || '')} onChange={event => update(field.id, field.type === 'gst' ? event.target.value.toUpperCase() : event.target.value)} placeholder={field.type === 'gst' ? 'e.g. 19ABCDE1234F1Z5' : ''} maxLength={field.type === 'gst' ? 15 : undefined} autoCapitalize={field.type === 'gst' ? 'characters' : undefined} />
        {field.hint && <div className="field-hint">{field.hint}</div>}
      </>}
    </div>;
  };

  if (done) return <div className="form-card success"><div className="eyebrow">Consultation received</div><h2>Thank you for contributing.</h2><p className="muted">Your company’s perspective has been submitted to the industry study.</p><p className="notice">Submission reference: {done}</p><Link className="btn" href="/">Return to the initiative</Link></div>;

  return <div className="form-shell">
    <div className="form-top"><div><div className="eyebrow">Market growth & export consultation</div><div className="form-step-label">Section {step + 1} of {sections.length}{showReview ? ' · Review' : ''}</div></div><Link href="/" className="muted form-exit">Exit consultation</Link></div>
    <div className="progress"><div style={{ width: `${progress}%` }} /></div>
    {!showReview ? <div className="form-card">
      <div className="eyebrow">Section 0{step + 1}</div><h1>{section.title}</h1><p className="intro">{section.intro}</p>
      {section.fields.map(renderField)}
      {error && <div className="error" role="alert">{error}</div>}
      <div className="form-actions"><button className="btn btn-outline" type="button" onClick={() => { setError(''); setStep(current => Math.max(0, current - 1)); }} disabled={step === 0}>Previous</button><button className="btn" type="button" onClick={() => { if (step === sections.length - 1) { if (validateSection()) setShowReview(true); } else next(); }}>{step === sections.length - 1 ? 'Review answers' : 'Continue'}</button></div>
    </div> : <div className="form-card">
      <div className="eyebrow">Final check</div><h1>Review your consultation</h1><p className="intro">Please check your answers before submitting.</p>
      {sections.map((item, index) => <div key={item.title} className="review-section"><div className="review-heading"><b>{item.title}</b><button type="button" onClick={() => { setStep(index); setShowReview(false); }}>Edit section</button></div>{item.fields.map(field => <div className="review-row" key={field.id}><b>{field.label}</b><span>{Array.isArray(answers[field.id]) ? (answers[field.id] as string[]).join(', ') : answers[field.id] || '—'}{field.otherField && answers[field.otherField] ? ` — ${answers[field.otherField]}` : ''}</span></div>)}</div>)}
      {error && <div className="error" role="alert">{error}</div>}
      <div className="form-actions"><button className="btn btn-outline" type="button" onClick={() => setShowReview(false)}>Back to form</button><button className="btn" type="button" onClick={submit} disabled={busy}>{busy ? 'Submitting…' : 'Submit consultation'}</button></div>
      {!isSupabaseConfigured && <p className="field-hint">The submission service must be configured before this form can accept responses.</p>}
    </div>}
  </div>;
}
