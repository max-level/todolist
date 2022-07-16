# build stage
FROM node:12 as build-stage

LABEL maintainer=guoyanhao@gmail.com

WORKDIR /app

COPY package.json ./

# RUN npm install -g npm@8.14.0
RUN npm install
# RUN yarn install

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
