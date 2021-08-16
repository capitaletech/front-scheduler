FROM node:latest

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 80 3000

CMD ["npm", "start:prod"]
