# Use a Node.js base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (including TypeScript)
COPY package*.json ./
RUN npm install

# Copy source code and config files
COPY . .

# Build TypeScript code
RUN npm run build

# Remove development dependencies and source code
RUN npm prune --production && \
    rm -rf src/ && \
    rm -rf node_modules/typescript && \
    rm -rf node_modules/@types

# Switch to non-root user
USER node

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api-docs || exit 1

# Start the application
CMD ["node", "dist/index.js"] 