FROM node:18
COPY . .
RUN npm install
EXPOSE 8070
WORKDIR /

CMD node app.js