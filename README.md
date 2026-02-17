# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

# EnterprisOS

This repository contains the EnterprisOS frontend built with Vite, TypeScript, React and Tailwind.

Supabase is configured for authentication and the database. See `supabase/init.sql` for the core schema used by the app (profiles, CRM, inventory, finance, HR, GST, and RBAC tables).

Local setup

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
cp .env.example .env.local
# Edit .env.local with your Supabase URL and publishable key
npm run dev
```

DB setup

- Run `supabase/init.sql` in the Supabase SQL editor to create the required tables and trigger to populate `profiles` on user signup.
- For production, keep service/DB connection strings out of client builds; store secrets in your hosting or server environment (do not prefix with `VITE_`).

Tech stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

- **Auth helper:** Use the React hook `useSupabaseAuth` at [src/hooks/use-supabase.ts](src/hooks/use-supabase.ts#L1-L999) to access `session`, `user`, and simple `signIn`/`signOut` helpers.
- **Local dev:** create a `.env` (or `.env.local`) with values from your Supabase project, then run:

```sh
npm i
npm run dev
```

Keep secret keys out of client-side builds and only use service role keys on trusted servers.
