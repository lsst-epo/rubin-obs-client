# Install dependencies only when needed
FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN yarn --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Build with NEXT_PUBLIC_API_URL from .env, which is needed during static site generation and must be the
# Docker bridge IP address which can be accessed within another container (can't be 'localhost')
RUN yarn static

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Now that build is complete, swap out the Docker bridge IP address with localhost for runtime usage
RUN find . -type f -exec sed -i 's/<Docker Craft container IP>/localhost/g' {} \;

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]