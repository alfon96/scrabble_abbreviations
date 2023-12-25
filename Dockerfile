FROM node:20-alpine3.18

RUN npm install -g npm@latest

RUN npm install -g create-react-app 

WORKDIR /app

EXPOSE 3000

CMD ["npx", "create-react-app" , "app"]
