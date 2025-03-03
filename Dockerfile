# Use uma imagem leve do Node.js
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia apenas os arquivos necessários para instalar dependências
COPY package*.json ./

# Instala todas as dependências, incluindo TypeScript
RUN npm install

COPY . .

# builda o codigo
RUN npm run build


USER node

# Expoe a porta do app
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api-docs || exit 1

CMD ["node", "dist/index.js"]
