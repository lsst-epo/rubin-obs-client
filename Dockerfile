FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_URL=https://api.rubinobs.org/api
ARG EDC_LOGGER_API_URL=https://us-central1-skyviewer.cloudfunctions.net/edc-logger
ARG NEXT_PUBLIC_BASE_URL=https://rubinobs.org
ARG NEXT_PUBLIC_GOOGLE_APP_ID=688095955960-t0fpaj4ec3gh5vsr9lhg8govapk2oeo9.apps.googleusercontent.com
ARG NEXT_PUBLIC_CONTACT_FORM_POST_URL=https://api.rubinobs.org/actions/contact-form/send
ARG NEXT_PUBLIC_PLAUSIBLE_DOMAIN=rubinobs.org
ARG CLOUD_ENV=PROD
ARG NEXT_PUBLIC_EFD_URL=https://hasura-e3g4rcii3q-uc.a.run.app/v1/graphql
ARG NEXT_PUBLIC_HASURA_SECRET=_qfq_tMbyR4brJ@KHCzuJRU7
ARG NEXT_PUBLIC_RELEASE_URL=`https://noirlab.edu/public/api/v2/releases/{{ID}}/?lang={{SITE}}&translation_mode=fallback`
ARG NEXT_PUBLIC_SURVEY_SPARROW=true

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV EDC_LOGGER_API_URL=$EDC_LOGGER_API_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_GOOGLE_APP_ID=$NEXT_PUBLIC_GOOGLE_APP_ID
ENV NEXT_PUBLIC_CONTACT_FORM_POST_URL=$NEXT_PUBLIC_CONTACT_FORM_POST_URL
ENV NEXT_PUBLIC_PLAUSIBLE_DOMAIN=$NEXT_PUBLIC_PLAUSIBLE_DOMAIN
ENV CLOUD_ENV=$CLOUD_ENV

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# RUN yarn static:build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/ ./

USER nextjs

EXPOSE 8080

ENV PORT 8080

CMD ["yarn", "start"]