FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY ./model-server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./model-server .

CMD ["python", "main.py"]