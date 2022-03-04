FROM node:16 AS builder

WORKDIR /usr/src/app

COPY package*.json .npmrc /usr/src/app/

RUN npm ci

COPY . /usr/src/app

ARG SENTRY_RELEASE
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    echo token=$(cat /run/secrets/SENTRY_AUTH_TOKEN) >> .sentryclirc \
    npm run build

FROM node:16-alpine AS runtime

WORKDIR /usr/src/app

ENV PORT=3000 \
    NODE_ENV=production

COPY --from=builder /usr/src/app/ /usr/src/app/

EXPOSE 3000
USER node

CMD ["./node_modules/.bin/next", "start"]
