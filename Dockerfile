# syntax=docker/dockerfile:1.19
FROM node:26.12.1-alpine AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /app
COPY --exclude=.env . /app
RUN apk add --no-cache libc6-compat

RUN npm install -g corepack && corepack enable
RUN yarn install --immutable

# Rebuild the source code only when needed
FROM base AS yarn-builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --exclude=.env . .
RUN --mount=type=bind,source=.env,target=/app/.env \
  yarn static:build


# FOR GCS bucket .next folder versioning
FROM scratch AS nextjs-copy
COPY --from=yarn-builder /app/.next /

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=yarn-builder --chown=nextjs:nodejs /app/ ./

USER nextjs

EXPOSE 8080

ENV PORT 8080

CMD ["yarn", "start"]