FROM node:16-alpine as build-step
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build --configuration=production 
FROM nginx:1.20.2-alpine
COPY --from=build-step /app/dist/back-office-project-ea1 /usr/share/nginx/html
