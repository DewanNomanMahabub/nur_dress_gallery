# Nur Dress Gallary — Vercel edition

## 1. Deploy the storefront

1. Extract this ZIP. The package.json, app, public and vercel.json files are at the ZIP root.
2. Put the extracted contents in your GitHub repository and import that repository into Vercel (or run `npx vercel --prod` from the extracted folder).
3. Framework: **Next.js**. Root Directory: the folder containing **package.json** (leave blank when it is the repository root).
4. Build command: `npm run build`. Install command: `npm install`. Output Directory: leave the override OFF; Next.js handles it. Node.js: 22.x.
5. Deploy. The storefront works with sample products before database setup. Orders and admin changes are disabled until setup is complete.

If reusing your old Vercel project, remove old output-directory and framework overrides and redeploy this source. Do not upload only public/ or select dist/ as the output.

## 2. Connect the shop backend

This edition uses Supabase, not Cloudflare. Create a Supabase project you control.

1. Open Supabase SQL Editor and run **supabase/schema.sql**. It creates three private tables and a private products image bucket. Use a new project or ensure these table names are unused.
2. In Authentication settings disable public user signups. Keep Email/password sign-in enabled.
3. In Authentication → Users, create your owner user with your own email and strong password. Mark the email confirmed. There is no shared/default password or old setup code in this edition.
4. In Vercel → Project Settings → Environment Variables, add all four values below for Production (and Preview if you use it):

| Variable | Value |
| --- | --- |
| SUPABASE_URL | Your project's https://...supabase.co URL |
| SUPABASE_ANON_KEY | Your project anon API key (legacy anon key) |
| SUPABASE_SERVICE_ROLE_KEY | Your project service_role API key (legacy service_role key); server only |
| ADMIN_EMAIL | Exact email of your owner account |

Find the keys in Supabase project API settings. Never prefix the service-role key with NEXT_PUBLIC_, commit it, or paste it into client code. All four variables here are used only on the server.

5. Redeploy after adding environment variables.
6. Open **https://YOUR-VERCEL-DOMAIN/admin** and sign in with the owner email and password.

## 3. Manage the shop

- Products: add/edit products, set colour-specific images, choose sizes or Free size. Select Apply product changes, then Save shop.
- Categories: save a new category; the storefront dropdown uses the saved categories automatically.
- Offers: add English/Bangla text, choose a category, show/hide offers and adjust the right-to-left ribbon speed. Save shop.
- Images: PNG/JPG/WebP, maximum 4 MB per upload.
- Team: first create the user's confirmed email/password account in Supabase Authentication. Then authorize the same email with Manager or Editor in the owner-only Team tab. Deleting a team entry revokes access on the next server request.
- Owner controls everything and team access; Manager controls catalog/categories/offers/orders/settings; Editor controls products only.
- Settings: replace sample products/images, confirm delivery fee and shop terms, then enable cash-on-delivery orders.
- Orders: review and confirm each order. Stock is not automatically reserved or decremented; update it after confirmation. No online payment or courier service is connected.
- Sessions expire after at most one hour; sign in again. Password resets are managed by the owner in Supabase. No public registration or customer account is required.

## Local use

Requires Node.js 22+. Run `npm install`, copy `.env.example` to `.env.local`, fill in your own values, then `npm run dev`. Run `npm run build` for the production build, `npm start` to serve it. `npm run typecheck` checks TypeScript.

## Scope and migration

Includes the latest mobile-focused Nur design and sample illustration photos, not real inventory. Existing Cloudflare/Sites database rows, staff accounts, orders and uploaded photos are NOT copied. Your previous Cloudflare version remains separate. Existing /media/ uploaded URLs need their image files copied to the new products bucket if you migrate catalog data. Public product assets and the supplied logo are included.

The layout and catalog UI remain portable for a later Cloudflare migration. Replace the small auth/backend/storage modules to change services; Supabase data is not automatically converted to D1/R2.

## Validation

Production build and TypeScript are checked locally. Backend permission and persistence flows are checked against a mocked Supabase API. Live Supabase credentials and a Vercel deployment are not supplied with the archive, so those services still require your setup. Mobile browser visual verification was unavailable in this environment.

## References

- https://vercel.com/docs/frameworks/full-stack/nextjs
- https://supabase.com/docs/guides/api
- https://supabase.com/docs/guides/storage/security/access-control
