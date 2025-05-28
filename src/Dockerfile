FROM node:18
WORKDIR /app
COPY . .
RUN npm install
COPY output.env .env
CMD ["npm", "start"]
