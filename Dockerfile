FROM node:20
WORKDIR /app
COPY ./src/server /app/server
COPY ./src/client /app/client
RUN npm install --prefix "./client" "./client"
RUN npm install --prefix "./server" "./server"
RUN npm install pm2 -g
CMD ["pm2-runtime","./server/index.js"]
EXPOSE 3000