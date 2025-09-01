FROM mcr.microsoft.com/playwright:v1.50.0-noble

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

# Build the TypeScript application
RUN npm run build

# Expose port
EXPOSE 8080

# Set environment variable for port
ENV PORT=8080

# Start the application
CMD ["npm", "start"]