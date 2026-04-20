FROM node:22.14.0-slim AS base

# Force cache invalidation
ARG CACHEBUST=1

WORKDIR /app

# Install OpenSSL (needed by Prisma)
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package.json package-lock.json prisma ./prisma ./
RUN npm ci

# Copy all source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js with dummy DATABASE_URL (only for build step)
ARG DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy
ENV DATABASE_URL=${DATABASE_URL}
RUN npm run build

# Reset DATABASE_URL so Railway's real value takes over at runtime
ENV DATABASE_URL=""

# Start the app
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Use node directly to start Next.js (avoids npm overhead)
CMD ["sh", "-c", "echo 'Starting app...' && npx prisma db push --accept-data-loss && echo 'DB push done, starting Next.js...' && exec node node_modules/.bin/next start"]
