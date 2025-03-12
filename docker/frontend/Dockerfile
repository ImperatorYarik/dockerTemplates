# Use an official node image as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "serve"]