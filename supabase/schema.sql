-- Bengal Electrical Industry consultation platform
-- Run in Supabase SQL Editor. Then create a founder account in Supabase Auth
-- and insert that user's UUID into public.founder_users.
create extension if not exists pgcrypto;

create table if not exists public.founder_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  company_address text,
  city text,
  district text,
  company_gst_number text,
  year_established integer,
  specialisation text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.respondents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  respondent_name text,
  designation text,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.questionnaire_submissions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  respondent_id uuid not null references public.respondents(id) on delete cascade,
  status text not null default 'submitted' check (status in ('draft','submitted')),
  payload jsonb not null,
  confidentiality text not null default 'Consent provided',
  consent_acknowledged boolean not null default false,
  submission_token text not null unique,
  submitted_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.question_responses (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.questionnaire_submissions(id) on delete cascade,
  question_key text not null,
  answer_text text,
  created_at timestamptz not null default now()
);
create table if not exists public.multiple_choice_selections (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.questionnaire_submissions(id) on delete cascade,
  question_key text not null,
  selected_value text not null
);
create table if not exists public.consent_records (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.questionnaire_submissions(id) on delete cascade,
  preference text not null,
  consent_acknowledged boolean not null,
  recorded_at timestamptz not null default now()
);
-- Upgrade existing installations before creating indexes or replacing the intake function.
alter table public.companies add column if not exists company_address text;
alter table public.companies add column if not exists city text;
alter table public.companies add column if not exists company_gst_number text;
alter table public.respondents alter column respondent_name drop not null;
alter table public.questionnaire_submissions add column if not exists submission_token text;
alter table public.questionnaire_submissions alter column confidentiality set default 'Consent provided';
update public.companies set city = district where city is null and district is not null;

drop index if exists public.uq_companies_name_district;
create unique index if not exists uq_companies_name_city on public.companies(lower(trim(company_name)), lower(coalesce(city,'')));
create unique index if not exists uq_submissions_token on public.questionnaire_submissions(submission_token);
create index if not exists idx_submissions_created on public.questionnaire_submissions(created_at desc);
create index if not exists idx_submissions_company on public.questionnaire_submissions(company_id);
create index if not exists idx_submissions_payload on public.questionnaire_submissions using gin(payload);

-- Public users can submit only through this validated function. There are no public SELECT policies.
create or replace function public.submit_consultation(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_company_id uuid;
  v_respondent_id uuid;
  v_submission_id uuid;
  v_company_name text;
  v_city text;
  v_gst text;
  v_token text;
  v_value jsonb;
  v_key text;
begin
  if payload is null or jsonb_typeof(payload) <> 'object' then
    raise exception 'Invalid consultation payload';
  end if;
  if octet_length(payload::text) > 100000 then
    raise exception 'The consultation is too large to submit';
  end if;

  v_token := nullif(trim(payload->>'submission_token'), '');
  if v_token is null or length(v_token) > 100 then
    raise exception 'A valid submission token is required';
  end if;

  -- Serialize retries carrying the same token, then return the original receipt.
  perform pg_advisory_xact_lock(hashtextextended(v_token, 0));
  select id, company_id into v_submission_id, v_company_id
  from questionnaire_submissions where submission_token = v_token;
  if v_submission_id is not null then
    return jsonb_build_object('submission_id',v_submission_id,'company_id',v_company_id,'status','already_submitted');
  end if;

  v_company_name := nullif(trim(payload->>'company_name'), '');
  v_city := nullif(trim(payload->>'city'), '');
  v_gst := upper(trim(coalesce(payload->>'company_gst_number','')));
  if v_company_name is null or v_city is null then
    raise exception 'Company name and city are required';
  end if;
  if v_gst !~ '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$' then
    raise exception 'Please provide a valid GSTIN';
  end if;
  if nullif(trim(payload->>'specialisation_products_services'),'') is null then
    raise exception 'Please provide the company specialisation, products or services';
  end if;
  if coalesce(payload->>'consent_ack','') <> 'I agree' then
    raise exception 'Consent acknowledgement is required';
  end if;

  -- Require a custom description whenever an "Other" choice is selected.
  for v_key,v_value in select key,value from jsonb_each(payload)
  loop
    if jsonb_typeof(v_value)='array' and v_value @> '["Other (please specify)"]'::jsonb then
      if nullif(trim(payload->>(case v_key
        when 'business_challenges' then 'business_challenges_other'
        when 'business_impact' then 'business_impact_other'
        when 'desired_technologies' then 'technology_other'
        when 'technology_barriers' then 'technology_barriers_other'
        when 'export_barriers' then 'export_barriers_other'
        else v_key || '_other'
      end)),'') is null then
        raise exception 'Please provide a description for the selected Other option';
      end if;
    end if;
  end loop;

  insert into companies(company_name,company_address,city,company_gst_number,specialisation)
  values(v_company_name,payload->>'company_address',v_city,v_gst,payload->>'specialisation_products_services')
  on conflict ( (lower(trim(company_name))), (lower(coalesce(city,''))) )
  do update set company_address=excluded.company_address,
                company_gst_number=excluded.company_gst_number,
                specialisation=excluded.specialisation,
                updated_at=now()
  returning id into v_company_id;

  insert into respondents(company_id,respondent_name)
  values(v_company_id,nullif(trim(payload->>'respondent_name'),''))
  returning id into v_respondent_id;

  insert into questionnaire_submissions(company_id,respondent_id,status,payload,confidentiality,consent_acknowledged,submission_token,submitted_at)
  values(v_company_id,v_respondent_id,'submitted',payload,'Consent provided',true,v_token,now())
  returning id into v_submission_id;

  for v_key,v_value in select key,value from jsonb_each(payload)
  loop
    if jsonb_typeof(v_value)='array' then
      insert into multiple_choice_selections(submission_id,question_key,selected_value)
      select v_submission_id,v_key,vals.selected_value
      from jsonb_array_elements_text(v_value) as vals(selected_value);
    else
      insert into question_responses(submission_id,question_key,answer_text)
      values(v_submission_id,v_key,case when jsonb_typeof(v_value)='null' then null else trim(both '"' from v_value::text) end);
    end if;
  end loop;

  insert into consent_records(submission_id,preference,consent_acknowledged)
  values(v_submission_id,'Consent provided',true);
  return jsonb_build_object('submission_id',v_submission_id,'company_id',v_company_id,'status','submitted');
end;
$$;
revoke all on function public.submit_consultation(jsonb) from public;
grant execute on function public.submit_consultation(jsonb) to anon, authenticated;

alter table public.founder_users enable row level security;
revoke all on public.founder_users from anon, authenticated;
grant select on public.founder_users to authenticated;
alter table public.companies enable row level security;
alter table public.respondents enable row level security;
alter table public.questionnaire_submissions enable row level security;
alter table public.question_responses enable row level security;
alter table public.multiple_choice_selections enable row level security;
alter table public.consent_records enable row level security;

create policy "founder can read own founder record" on public.founder_users for select to authenticated using (auth.uid()=user_id);
create policy "founders read companies" on public.companies for select to authenticated using (exists(select 1 from public.founder_users f where f.user_id=auth.uid()));
create policy "founders read respondents" on public.respondents for select to authenticated using (exists(select 1 from public.founder_users f where f.user_id=auth.uid()));
create policy "founders read submissions" on public.questionnaire_submissions for select to authenticated using (exists(select 1 from public.founder_users f where f.user_id=auth.uid()));
create policy "founders read responses" on public.question_responses for select to authenticated using (exists(select 1 from public.founder_users f where f.user_id=auth.uid()));
create policy "founders read selections" on public.multiple_choice_selections for select to authenticated using (exists(select 1 from public.founder_users f where f.user_id=auth.uid()));
create policy "founders read consent" on public.consent_records for select to authenticated using (exists(select 1 from public.founder_users f where f.user_id=auth.uid()));

-- Keep direct client-side writes blocked. Public intake is only via submit_consultation().
revoke all on public.companies, public.respondents, public.questionnaire_submissions, public.question_responses, public.multiple_choice_selections, public.consent_records from anon, authenticated;
grant select on public.founder_users, public.companies, public.respondents, public.questionnaire_submissions, public.question_responses, public.multiple_choice_selections, public.consent_records to authenticated;

