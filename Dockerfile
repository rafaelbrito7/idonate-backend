# Use the official Node.js 16 image as the builder stage
FROM node:21 AS builder

# Set the working directory
ENV HOME=/app
WORKDIR $HOME

# Update system and install OpenSSL
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy Prisma schema file
COPY --chown=node:node prisma ./prisma

# Copy package.json and package-lock.json (or yarn.lock)
COPY --chown=node:node package*.json $HOME/

# Install dependencies (will also trigger Prisma client generation due to postinstall script)
RUN npm install

# Copy application code with correct ownership
COPY --chown=node:node . .

# Build the application
RUN npm run build

# Start a new stage from a slim version of the Node.js image
FROM node:21 as app

# Set the working directory in the new stage
ENV HOME=/app
WORKDIR $HOME

# Clear npm cache
RUN npm cache clean --force

# Fix npm cache permissions
RUN mkdir -p /app/.npm && chown -R node:node /app/.npm

# Switch to 'node' user for better security
USER node

# Copy the node_modules and build directory from the builder stage
COPY --chown=node:node --from=builder /app/node_modules $HOME/node_modules
COPY --chown=node:node --from=builder /app/prisma $HOME/prisma
COPY --chown=node:node --from=builder /app/package*.json $HOME/
COPY --chown=node:node --from=builder /app/dist $HOME/dist

# Expose the port the app runs on
EXPOSE 3000

# Set the command to start the Node.js server
CMD ["npm", "run", "start:migrate:prod"]
