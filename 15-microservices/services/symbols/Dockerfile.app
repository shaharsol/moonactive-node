# exampkle of packing a "dev" version of the app in docker
# it's a "dev" version since it's running nodemon and ts-node
# FROM node:22-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . ./
# CMD ["npm", "run", "io"]

FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
RUN rm -rf ./src
CMD ["node", "dist/app.js"]