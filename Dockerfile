FROM node:18-alpine
WORKDIR /app
COPY package*.json /app
COPY . /app
RUN npm install
RUN npm install nodemon -g
RUN npm install express
RUN npm install dotenv -g
RUN npm install jsonwebtoken
RUN npm install concurrently
EXPOSE 4000
EXPOSE 5000
CMD ["node", "start"]