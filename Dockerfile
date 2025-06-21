
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . ./

RUN npm run build



FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm ci --omit=dev

RUN node -e "const t = require('@xenova/transformers'); t.pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')"

EXPOSE 4000

CMD ["npm", "start"] 