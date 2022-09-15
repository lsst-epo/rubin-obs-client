# Based on https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat git
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

ARG NEXT_PUBLIC_API_URL=https://api.rubinobs.org/api
ARG NEXT_PUBLIC_BASE_URL=https://rubinobs.org
ARG NEXT_PUBLIC_GOOGLE_APP_ID=688095955960-t0fpaj4ec3gh5vsr9lhg8govapk2oeo9.apps.googleusercontent.com
ARG NEXT_PUBLIC_PAGEPROOFER_ID=false
ARG NEXT_PUBLIC_LEVELACCESS_ID=false
ARG NEXT_PUBLIC_CONTACT_FORM_POST_URL=https://api.rubinobs.org/actions/contact-form/send
ARG NEXT_PUBLIC_PLAUSIBLE_DOMAIN=rubinobs.org

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn static:build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./static
COPY --from=builder --chown=nextjs:nodejs /app/.next/public ./public

USER nextjs

EXPOSE 8080

ENV PORT 8080

CMD ["node", "server.js"]