FROM node:14.17.0-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

FROM nginx:1.17.6
RUN rm -rf /usr/share/nginx/html/*
COPY --from=0 /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
