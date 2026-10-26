# ZARTZ Morapay checkout setup

## 1. Get your real keys

1. Sign in to [Morapay Business](https://business.morapay.io).
2. Open **Developers → API keys**.
3. Copy the full public key and its matching secret key. The public key you pasted looks like a key identifier; copy the complete value from the dashboard.
4. Make sure both keys belong to the same environment (test with test, live with live). Live payments may require merchant onboarding/KYB approval.

**Important:** `your_secret_key_here` is a placeholder, not a working secret. Never send the secret key in chat or commit it to GitHub.

## 2. Add secrets in Vercel

1. Open [Vercel Dashboard](https://vercel.com/dashboard).
2. Select the **zarty** project.
3. Go to **Settings → Environment Variables**.
4. Add each variable below. Put the name in **Key**, the real value in **Value**, choose **Production** (and **Preview** if you will test preview deployments), then save.

| Key | Value |
|---|---|
| `MORAPAY_API_BASE_URL` | `https://business.morapay.io/api/v1/merchant` |
| `MORAPAY_PUBLIC_KEY` | Full Morapay public key |
| `MORAPAY_SECRET_KEY` | Matching real Morapay secret key |
| `MORAPAY_WEBHOOK_SECRET` | Signing secret from the Morapay webhook configuration |
| `SUPABASE_URL` | `https://lvxszuxfiezwwiuqzxxd.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase server-only service-role key (or set `SUPABASE_SECRET_KEY`) |
| `SITE_ORIGIN` | `https://zarty-tidewellmanu.vercel.app` |

Use the Supabase server-only service-role/secret key from **Supabase → Project Settings → API**. Never place it in `index.html`, `script.js`, or any `NEXT_PUBLIC_*` variable.

## 3. Set up the Morapay webhook

1. In Morapay, open **Developers → Webhooks** (wording may vary).
2. Add this HTTPS endpoint:
   `https://zarty-tidewellmanu.vercel.app/api/morapay/webhook`
3. Enable the available payment success/completed and failure/expired events.
4. Copy the webhook signing secret into Vercel as `MORAPAY_WEBHOOK_SECRET`.
5. If the Morapay dashboard offers a post-checkout redirect URL, set it to `https://zarty-tidewellmanu.vercel.app/`.

The website does not treat a redirect as proof of payment. A valid signed webhook is what updates an order to paid.

## 4. Redeploy and test

1. After saving environment variables, go to **Deployments** in Vercel and redeploy the latest production deployment so the new serverless environment is active.
2. Use test keys first if your Morapay account offers them.
3. Add a published artwork to the cart and start checkout.
4. In Vercel, inspect **Logs → Functions** for `/api/morapay/initialize` and `/api/morapay/webhook`.
5. In Morapay, confirm that the payment link was created and that the webhook delivery succeeded.
6. In Supabase, check the `orders` row. It should remain `pending` until a verified webhook changes it to `success`. On success, the purchased artworks are marked `sold`.
7. Do not switch to live transactions until the test flow and webhook are confirmed.

## 5. Admin moderation and publishing

- Admin sign-in uses a Supabase account whose user ID is in `public.app_admins`.
- The admin dashboard has **Review queue**, **Journal**, and **Exhibitions** sections.
- Admin-added artworks and journal posts are submitted as pending and have an **Approve & publish** / **Accept & publish** action.
- Signed-in users can submit journal posts from their dashboard. They remain pending until an admin approves them.
- Admin-created exhibitions are published immediately from the Exhibitions tab.

## Troubleshooting

- **Payment setup incomplete:** check that all required Vercel environment variable names exist and that you redeployed after saving them.
- **Morapay rejects checkout creation:** verify the full matching live/test key pair, the merchant API base URL, and whether live checkout is enabled for the merchant.
- **Order stays pending:** inspect Morapay webhook delivery logs, ensure the endpoint URL is exact, and check that the webhook signing secret is configured.
- **No checkout URL:** inspect the Vercel Function logs and compare the link response shape with the active Morapay SDK/API version.

The Morapay merchant API is evolving; confirm the exact event names and payload in your own dashboard/test webhook before accepting real payments.
