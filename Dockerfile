# Help me create a Dockerfile for my Next.js project

FROM node:26-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:26-slim AS runner

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm install --production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000



CMD ["npm", "start"]
