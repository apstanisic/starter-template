FROM node:lts-alpine

ENV NODE_ENV production

WORKDIR /app

COPY . /app

RUN yarn install --frozen-lockfile --production=false
RUN npx next telemetry disable
RUN yarn run build

CMD ["npm", "start"]