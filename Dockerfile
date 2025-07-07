
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev --ignore-scripts
COPY . ./

RUN npm run build



FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --omit=dev --ignore-scripts

RUN node -e "const t = require('@xenova/transformers'); t.pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')"

EXPOSE 4000

CMD ["npm", "start"] 