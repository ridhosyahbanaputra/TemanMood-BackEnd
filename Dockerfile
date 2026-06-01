FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN npm install

RUN npx prisma generate

COPY src ./src

EXPOSE 9000

CMD ["npm", "start"]