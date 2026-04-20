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

# Build Next.js with dummy DATABASE_URL (only for build step, NOT persisted as ENV)
ARG DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy
ENV DATABASE_URL=${DATABASE_URL}
RUN npm run build

# Reset DATABASE_URL to empty so Railway's runtime ENV takes over
# Note: Railway ENV vars override Dockerfile ENV vars at runtime
ENV DATABASE_URL="" 

# Start the app
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c", "npx prisma db push --accept-data-loss 2>/dev/null; npm run start"]
