# ZARTZ Paystack + Supabase setup

The frontend uses Supabase Auth, Postgres and Storage. Never put `SUPABASE_SERVICE_ROLE_KEY`, a Supabase secret key, or `PAYSTACK_SECRET_KEY` in browser code or commit real secrets.

## Vercel environment variables

Set these under Project → Settings → Environment Variables, for Development/Preview/Production as needed:

- `SUPABASE_URL`: `https://lvxszuxfiezwwiuqzxxd.supabase.co`
- `SUPABASE_ANON_KEY`: the Supabase publishable key (or legacy anon key); safe for browser/session validation.
- `SUPABASE_SERVICE_ROLE_KEY`: service-role key from Supabase Project Settings → API Keys. Server-only, set as Secret.
- `PAYSTACK_SECRET_KEY`: Paystack secret key. Server-only, set as Secret.
- `PAYSTACK_PUBLIC_KEY`: optional if using Paystack inline JS elsewhere.

After setting variables, redeploy the Vercel project.

## Create the first administrator

1. Open the deployed site and use **Sell your art** to create an account with your intended administrator email.
2. Confirm the email if Supabase email confirmation is enabled, then sign in once.
3. In Supabase SQL Editor, run the following using that account's actual UUID from Authentication → Users:

```sql
insert into public.app_admins (user_id)
values ('PASTE_AUTH_USER_UUID_HERE')
on conflict (user_id) do nothing;
```

4. Sign out and sign in again, then open the Admin link. Only accounts present in `app_admins` are administrators; browser metadata or a guessed password cannot grant admin access.

## Behaviour

- Seller accounts use Supabase Auth; profiles are stored in `public.profiles`.
- Artwork images go to the public `artwork-images` bucket under a user-specific folder. PDF booklets go to the private `profile-booklets` bucket.
- Artwork submissions are saved with `status='pending'`; only approved artworks appear publicly.
- Paystack checkout takes artwork UUIDs only. The server recalculates prices from approved Supabase artwork rows, creates `orders` and `order_items`, then starts Paystack.
- The verify endpoint checks the Paystack reference, paid status, exact amount and currency against the saved order before setting `payment_status='success'` and `paid_at`.

The project database schema and Row Level Security policies must be installed in the linked Supabase project. This repository integration expects the `public_profiles` view to expose public profile fields without exposing profile email addresses.
