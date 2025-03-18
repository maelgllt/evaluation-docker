FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN apk add --no-cache mysql-client

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]