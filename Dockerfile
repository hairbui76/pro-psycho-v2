FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g node-gyp
RUN npm install argon2
RUN npm install --silent --ignore-scripts
# RUN node-pre-gyp rebuild -C ./node_modules/argon2
COPY . .
EXPOSE 5000
CMD ["node", "src/server.js"]
