FROM node:14.17 as build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY ./ .
RUN yarn run build

FROM nginx:1.21
RUN mkdir /app
COPY --from=build /app/dist/shop  /app
COPY nginx.conf /etc/nginx/nginx.conf
 