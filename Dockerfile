FROM node:20
WORKDIR /app
COPY ./src/server /app
RUN npm install
RUN npm install pm2 -g
CMD ["pm2-runtime","index.js"]
EXPOSE 3000