FROM node:18

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

CMD ["node", "dist/main"]