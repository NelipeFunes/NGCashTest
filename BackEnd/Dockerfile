FROM node:16.14-alpine

WORKDIR /.

COPY package* ./

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 3010

CMD ["npm", "start"]
