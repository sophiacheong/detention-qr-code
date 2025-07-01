FROM python:3.11-slim
RUN pip install ansible boto3
WORKDIR /app
COPY . .
CMD ["sh", "-c", "ansible-playbook playbook.yml"]
