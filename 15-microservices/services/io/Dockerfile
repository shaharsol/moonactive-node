FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
RUN rm -rf ./src
EXPOSE 3003
CMD ["node", "dist/io.js"]