# Stage 1: install dependencies
FROM node:20-alpine AS deps
WORKDIR /service
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm install

# Stage 2: build
FROM node:20-alpine AS builder
WORKDIR /service
COPY --from=deps /service/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: run
FROM node:20-alpine AS runner
WORKDIR /service
ENV NODE_ENV=production
COPY --from=builder /service/package.json ./package.json
COPY --from=builder /service/node_modules ./node_modules
COPY --from=builder /service/dist ./dist
EXPOSE 8080
CMD ["npm","run","start"]
