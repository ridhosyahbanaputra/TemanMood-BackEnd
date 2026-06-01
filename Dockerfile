FROM node:22-alpine

WORKDIR /app

ARG DATABASE_URL
ARG DIRECT_URL

ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN npm install

RUN npx prisma generate

COPY src ./src
COPY public ./public

EXPOSE 9000

CMD ["npm", "start"]