FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY yarn.lock ./

RUN npm install 
RUN yarn install

COPY . ./

EXPOSE 3000

CMD [ "npm", "start" ]