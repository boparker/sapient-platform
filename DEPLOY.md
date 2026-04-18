# Sapient Platform - Railway Deployment Guide

## Prerequisites
- Railway CLI installed (`npm install -g @railway/cli`)
- Railway account connected to GitHub

## Deployment Steps

### 1. Login to Railway
```bash
railway login
```

### 2. Create Project
```bash
cd ~/workspace/sapient-platform
railway init
```
- Select "Create a new project"
- Name it: "sapient-platform"

### 3. Add PostgreSQL Database
```bash
railway add --database postgres
```
- This creates a managed PostgreSQL instance
- Railway auto-injects DATABASE_URL env var

### 4. Configure Environment Variables
```bash
railway variables set NEXTAUTH_SECRET="$(openssl rand -base64 32)"
railway variables set STRIPE_SECRET_KEY="sk_live_..."
railway variables set STRIPE_WEBHOOK_SECRET="whsec_..."
railway variables set STRIPE_PUBLISHABLE_KEY="pk_live_..."
railway variables set SMTP_HOST="smtp.sendgrid.net"
railway variables set SMTP_PORT="587"
railway variables set SMTP_USER="apikey"
railway variables set SMTP_PASS="your-sendgrid-key"
railway variables set FROM_EMAIL="noreply@andreabertoli.com"
```

### 5. Deploy
```bash
railway up
```

### 6. Run Database Migrations
```bash
railway run npx prisma migrate dev --name init
```

### 7. Seed Initial Data
```bash
railway run npx ts-node scripts/seed.ts
```

### 8. Get Domain
```bash
railway domain
```
- Copy the generated domain (e.g., `sapient-platform.up.railway.app`)
- Set custom domain later: `andreabertoli.com`

## Post-Deployment

### Stripe Webhook Setup
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy signing secret to `STRIPE_WEBHOOK_SECRET`

### Custom Domain
1. Railway Dashboard → Settings → Domains
2. Add custom domain: `andreabertoli.com`
3. Update DNS: CNAME `andreabertoli.com` → Railway domain

## Local Development

```bash
# Install dependencies
npm install

# Set up local database (or use Railway dev database)
cp .env.example .env
# Edit .env with your values

# Run migrations
npx prisma migrate dev

# Seed data
npx ts-node scripts/seed.ts

# Start dev server
npm run dev
```

## Project Structure
```
sapient-platform/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── page.tsx        # Homepage
│   │   ├── pricing/        # Pricing page
│   │   ├── dashboard/      # Member dashboard
│   │   ├── courses/        # Course content
│   │   └── api/            # API routes
│   ├── lib/
│   │   ├── prisma.ts       # Prisma client
│   │   └── stripe.ts       # Stripe client
│   └── components/         # React components
├── railway.json            # Railway config
└── DEPLOY.md              # This file
```

## Next Steps
1. ✅ Repo created: https://github.com/boparker/sapient-platform
2. ⏭️ Railway project setup (manual CLI steps above)
3. ⏭️ Database migrations
4. ⏭️ Seed Andrea's tiers and content structure
5. ⏭️ Stripe integration
6. ⏭️ Deploy staging