# Vercel-Subsciption-Project-Setup
1. Use the link to create a fork of https://github.com/shurupin/nextjs-saas-starter-kit and setup project in Vercel:
- https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshurupin%2Fnextjs-saas-starter-kit&env=NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY&envDescription=Enter%20your%20Stripe%20API%20keys.&envLink=https%3A%2F%2Fdashboard.stripe.com%2Fapikeys&project-name=nextjs-saas-starter-kit&repository-name=nextjs-saas-starter-kit&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6&external-id=https%3A%2F%2Fgithub.com%2Fshurupin%2Fnextjs-saas-starter-kit%2Ftree%2Fmain

2. Get Stripe Secrets
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY - from https://dashboard.stripe.com/apikeys
3. Deploy
4. Get Stripe Secrets
- STRIPE_WEBHOOK_SECRET - from https://dashboard.stripe.com/apikeys
- NEXT_PUBLIC_SITE_URL - your website url
set them and redeploy
5. https://supabase.com/dashboard/project/dbnlgoiwerlsgruurebg/auth/url-configuration
- update Site URL to NEXT_PUBLIC_SITE_URL value
- update Redirect URLs
5. Go to https://console.cloud.google.com/apis/dashboard?project=promeeting-372611 and create new project, select it, go to Credentials and create new OAuth 2.0 Client IDs
- Authorized JavaScript origins = NEXT_PUBLIC_SITE_URL value
- Authorized redirect URIs - get it from https://supabase.com/dashboard/project/dbnlgoiwerlsgruurebg/auth/providers of Google provider. After creation you will get Client ID and Client secret for Supabase to set it here https://supabase.com/dashboard/project/dbnlgoiwerlsgruurebg/auth/providers
6. Enable SMPT
- go to https://supabase.com/dashboard/project/dbnlgoiwerlsgruurebg/settings/auth and paste values from mailgun
7. Increase Rate Limits for email to 1500 (good number?) https://supabase.com/dashboard/project/dbnlgoiwerlsgruurebg/auth/rate-limits
8. Update password settings regarding https://github.com/shurupin/aviasalesclub/blob/main/validations/auth/index.ts
9. Add from Vercel at https://vercel.com/shurupins-projects/aviasalesclub/settings/domains to Squarespace https://account.squarespace.com/domains/managed/aviasalesclub.com/dns/dns-settings settings for domainname (NEXT_PUBLIC_SITE_URL) like (also delete default settings):
Host - Type - Priority - Data
@ - A - — - 76.76.21.21
www - CNAME - — - cname.vercel-dns.com