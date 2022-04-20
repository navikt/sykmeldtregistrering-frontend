FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json .npmrc .env ./ 
RUN npm ci && \
    node /app/node_modules/@sentry/cli/scripts/install.js

FROM node:16 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG SENTRY_RELEASE
ARG SENTRY_LOG_LEVEL
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    echo token=$(cat /run/secrets/SENTRY_AUTH_TOKEN) >> .sentryclirc

RUN npm run build

FROM node:16-alpine AS runner

ENV PORT=3000 \
    NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
