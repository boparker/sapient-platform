FROM node:22.14.0-slim AS base

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

# Provide dummy DATABASE_URL for build only
ARG DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
ENV DATABASE_URL=${DATABASE_URL}

# Build Next.js
RUN npm run build

# Remove build-time DATABASE_URL so Railway's real one takes over
ENV DATABASE_URL=""

# Start the app
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c", "npx prisma migrate deploy && node .next/standalone/server.js"]
