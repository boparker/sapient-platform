FROM node:22.14.0-slim

WORKDIR /app

# Install OpenSSL (needed by Prisma)
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# ---- Install deps ----
COPY package.json package-lock.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci

# ---- Copy source and build ----
COPY . .

# Dummy DATABASE_URL for build (Prisma generate + build needs it)
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npx prisma generate && npm run build

# ---- Runtime config ----
# Reset DATABASE_URL so Railway's real value takes over
ENV DATABASE_URL=""
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start: push schema to DB, then start Next.js
CMD ["sh", "-c", "npx prisma db push --accept-data-loss 2>&1 && echo 'DB ready, starting Next.js...' && exec node node_modules/.bin/next start"]
