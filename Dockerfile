FROM node:16

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=8192" npm run build

RUN mkdir -p /dist/files

COPY ./files /dist/files

RUN rm -rf ./files

ENV PORT=3001

EXPOSE 3001

CMD [ "npm", "run",  "dev" ]