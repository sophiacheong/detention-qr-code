FROM node:20-slim

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION=us-east-2

ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_REGION=$AWS_REGION

RUN apt-get update && apt-get install -y python3-pip python3-venv && pip install ansible boto3

WORKDIR /app

COPY . .

RUN echo "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID" && echo "AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY" && echo "AWS_REGION=$AWS_REGION"
RUN ansible-playbook playbook.yml

COPY output.env .env

RUN npm install
RUN npm run build

CMD ["npm", "start"]
