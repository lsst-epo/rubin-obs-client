# This file is based on the official Next.js Docker example. https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Rebuild the source code only when needed
FROM node:16-alpine AS node-deps
WORKDIR /app
COPY package.json .

# RUN apk add --no-cache libc6-compat git
RUN yarn install --frozen-lockfile

# RUN npx browserslist@latest --update-db

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=node-deps --chown=nextjs:nodejs /app/ ./
COPY --chown=nextjs:nodejs . /app

USER nextjs

ARG NEXT_PUBLIC_API_URL=https://api.rubinobs.org/api
ARG EDC_LOGGER_API_URL=https://us-central1-skyviewer.cloudfunctions.net/edc-logger
ARG NEXT_PUBLIC_BASE_URL=https://rubinobs.org
ARG NEXT_PUBLIC_GOOGLE_APP_ID=688095955960-t0fpaj4ec3gh5vsr9lhg8govapk2oeo9.apps.googleusercontent.com
ARG NEXT_PUBLIC_CONTACT_FORM_POST_URL=https://api.rubinobs.org/actions/contact-form/send
ARG NEXT_PUBLIC_PLAUSIBLE_DOMAIN=rubinobs.org
ARG CLOUD_ENV=PROD

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV EDC_LOGGER_API_URL=$EDC_LOGGER_API_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_GOOGLE_APP_ID=$NEXT_PUBLIC_GOOGLE_APP_ID
ENV NEXT_PUBLIC_CONTACT_FORM_POST_URL=$NEXT_PUBLIC_CONTACT_FORM_POST_URL
ENV NEXT_PUBLIC_PLAUSIBLE_DOMAIN=$NEXT_PUBLIC_PLAUSIBLE_DOMAIN
ENV CLOUD_ENV=$CLOUD_ENV

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 8080

CMD ["yarn", "start"]
