FROM python:3.11-slim
RUN pip install --no-cache-dir ansible boto3
WORKDIR /app
COPY . .
COPY entrybuild.sh /entrybuild.sh
RUN chmod +x /entrybuild.sh
CMD ["ansible-playbook", "playbook.yml"]
