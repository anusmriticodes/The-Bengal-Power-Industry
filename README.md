# The Bengal Electrical Industry — Market Growth & Export Study

A Next.js 14 application for the public industry-study website, five-section manufacturer consultation, and private founder research dashboard. The visual identity retains the established navy, off-white, steel-blue and muted-gold palette.

## Included

- Responsive public website with the updated “A New Chapter in Bengal’s Industrial Story” narrative.
- Broader development principles covering inclusion, sustainability, human well-being, innovation and shared prosperity.
- Consistent initiative attribution: **Founded by Saptarshi Mitra | With Chief Mentorship of Dr. Jagat Shah**.
- Five-section company consultation form:
  1. Company Profile
  2. Business Operations, Growth & Challenges
  3. Technology, Manufacturing & Future Readiness
  4. Export & Market Growth Opportunities
  5. Consent & Submission
- Multi-select business challenges and future-readiness options, with conditional “Other (please specify)” fields.
- GSTIN format validation, required-field validation and browser-local draft recovery.
- Supabase-backed persistent submissions using a server-side PostgreSQL function (`submit_consultation`), unique submission IDs and idempotency tokens.
- Private founder login and dashboard. Submitted company records are not publicly readable.
- A restrained professional icon system using consistent line icons.

## Local setup

1. Install Node.js 20 or later.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. In the Supabase SQL Editor, run `supabase/schema.sql`.
5. Create the founder account in Supabase Authentication. Disable public sign-ups.
6. Add the authorised founder's UUID to the allow-list:

```sql
insert into public.founder_users(user_id)
values ('YOUR_AUTH_USER_UUID');
```

7. Run `npm run dev` and open `http://localhost:3000`.

## Database and security

- Consultation submissions are persisted in Supabase PostgreSQL.
- Public intake is performed through the `SECURITY DEFINER` function `public.submit_consultation`; direct public table writes and reads are revoked.
- The function validates required company information, GSTIN format, consent, payload size and selected “Other” answers.
- A unique `submission_token` makes retries idempotent, so a repeated submit request returns the original receipt rather than creating a duplicate.
- The founder dashboard requires a Supabase Auth session and a matching `founder_users` row. Row-level security restricts private records to authorised founder accounts.
- Only the Supabase URL and anon/public key belong in the frontend environment. Never expose a service-role key or database password in browser code or `NEXT_PUBLIC_*` variables.
- Drafts are saved in the respondent's browser local storage until submission. They are not uploaded as drafts.

## Important deployment steps

This project contains the real database integration, but it cannot accept persistent submissions until it is connected to a Supabase project. The project owner must configure the two environment variables, execute the SQL schema and provision at least one founder account. No Supabase credentials were included with this project, so a live database write and founder login cannot be verified from this package alone.

Before public launch:
- Configure Supabase Auth email delivery, password recovery and MFA for founder accounts.
- Add rate limiting or CAPTCHA to the public submission endpoint/RPC to reduce spam.
- Configure database backups, retention and monitoring.
- Review consent and confidentiality wording with the initiative's data controller.
- Test a real submission and verify it appears in the authorised founder dashboard.

## Deploy

Deploy to Vercel or another Next.js-compatible host. Add the two environment variables in the hosting provider's project settings. Run `supabase/schema.sql` against the production Supabase project and provision authorised founder users before opening the consultation form to the public.

## Main files

- `app/page.tsx` — public homepage
- `app/consultation/page.tsx` — consultation route
- `components/ConsultationForm.tsx` — form flow, validation and Supabase submission
- `lib/questions.ts` — questionnaire content
- `supabase/schema.sql` — database schema, RLS policies and secure submission function
- `app/dashboard/page.tsx` — restricted founder dashboard
