
FROM node:16-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN rm -rf node_modules

RUN rm -rf dist

RUN npm install

RUN npm run build --configuration=production 

FROM nginx:1.20.2-alpine

COPY --from=build-step /app/dist/back-office-project-ea1 /usr/share/nginx/html
