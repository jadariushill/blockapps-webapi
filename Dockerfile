FROM node:20
WORKDIR /app
COPY ./src/server /app/server
COPY ./src/client /app/client

WORKDIR ./client
RUN npm install 
RUN npm run build

WORKDIR ../server
RUN npm install
RUN npm install pm2 -g
CMD ["pm2-runtime","index.js"]
EXPOSE 3000