FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# builda o codigo
RUN npm run build

# remove depedencia de dev
RUN npm prune --production && \
    rm -rf src/ && \
    rm -rf node_modules/typescript && \
    rm -rf node_modules/@types


USER node

# expoe a porta do app
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api-docs || exit 1

CMD ["node", "dist/index.js"]
