FROM node:16 AS builder

WORKDIR /usr/src/app

COPY package*.json .npmrc /usr/src/app/

RUN npm ci && \
    node /usr/src/app/node_modules/@sentry/cli/scripts/install.js

COPY . /usr/src/app

ARG SENTRY_RELEASE
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    echo token=$(cat /run/secrets/SENTRY_AUTH_TOKEN) >> .sentryclirc \
    npm run build

FROM node:16-alpine AS runtime

WORKDIR /app

ENV PORT=3000 \
    NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
