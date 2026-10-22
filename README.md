# ZARTZ — Marketplace Setup

## Admin panel access

Use your Supabase account. Only users listed in the `public.app_admins` table can administer this site.

### Sign up an administrator

1. Open the deployed ZARTZ website and use the normal **Sign up / Create account** flow to register with the email address you want to use for administration.
2. Confirm your email if Supabase requires email confirmation, then sign in to the website once.
3. In the [Supabase Dashboard](https://supabase.com/dashboard/project/lvxszuxfiezwwiuqzxxd), open **Authentication → Users**.
4. Find the account you just created and copy its **User UID** (UUID).
5. Open the [Supabase SQL Editor](https://supabase.com/dashboard/project/lvxszuxfiezwwiuqzxxd/sql/new) and run the following SQL, replacing the placeholder with that exact User UID:

   ```sql
   insert into public.app_admins (user_id)
   values ('YOUR_AUTH_USER_UUID')
   on conflict (user_id) do nothing;
   ```

6. Sign out of ZARTZ and sign back in. The account should now have administrator access to the admin panel.

**Important:** Signing up alone does not grant administrator privileges. A user must be explicitly added to `public.app_admins` by an existing database administrator. Never expose the Supabase service-role key in frontend code, GitHub, or chat. Do not give public visitors permission to insert their own rows into `app_admins`.

## Supabase configuration

The browser uses the Supabase project URL and publishable/anonymous key. These are public client settings and may be included in frontend configuration. Keep the service-role key private and configure it only as a Vercel environment variable for server-side API functions.

Required Vercel environment variables for the server-side Paystack checkout:

- `SUPABASE_URL` — the Supabase project URL.
- `SUPABASE_ANON_KEY` — the Supabase publishable/anonymous key.
- `SUPABASE_SERVICE_ROLE_KEY` — the private Supabase service-role key; server-side only.
- `PAYSTACK_SECRET_KEY` — the private Paystack secret key; server-side only.

Add private keys in the Vercel project’s Environment Variables settings for the environments you deploy, then redeploy the project after changing variables.

## Seller artwork publishing

Sellers register and sign in through Supabase Authentication. New artwork submissions require administrator review before they appear as approved artwork. Artwork image files are stored in Supabase Storage; optional profile booklet PDFs use the private `profile-booklets` bucket.

## Paystack order verification

Checkout must use the server-side API routes. The server calculates order totals from approved artwork records in Supabase and verifies the Paystack reference, amount, currency, and matching order before marking an order as paid. Do not fulfill an order based only on a client-side success message.

## Deployment

Repository: [tidewellmanu/zarty](https://github.com/tidewellmanu/zarty)

Production site: [https://zarty-tidewellmanu.vercel.app](https://zarty-tidewellmanu.vercel.app)
