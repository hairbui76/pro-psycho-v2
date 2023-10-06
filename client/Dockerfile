FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent --ignore-scripts
COPY . .
ARG VITE_API_ENDPOINT=http://localhost:5000/v1
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]