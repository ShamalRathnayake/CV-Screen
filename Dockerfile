
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
COPY ./.husky ./.husky

RUN apt-get update && apt-get install -y \
    build-essential \
    libvips-dev \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

RUN npm ci

COPY . ./

RUN npm run build



FROM node:20 AS release

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.husky ./.husky


RUN apt-get update && apt-get install -y \
    build-essential \
    libvips-dev \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

RUN npm install --omit=dev 

RUN npm rebuild sharp

EXPOSE 4000

CMD ["npm", "start"] 