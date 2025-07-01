FROM node:20-slim

RUN apt-get update && apt-get install -y python3-pip python3-venv && pip install ansible boto3

WORKDIR /app

COPY . .

RUN ansible-playbook playbook.yml

COPY output.env .env

RUN npm install
RUN npm run build

CMD ["npm", "start"]
