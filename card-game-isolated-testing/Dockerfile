# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Define build arguments
ARG VITE_IS_DOCKER
ARG VITE_WEB_SERVER_URL
ARG VITE_WEB_SERVER_PORT

# Set environment variables
ENV VITE_IS_DOCKER=$VITE_IS_DOCKER
ENV VITE_WEB_SERVER_URL=$VITE_WEB_SERVER_URL
ENV VITE_WEB_SERVER_PORT=$VITE_WEB_SERVER_PORT



# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Install serve to serve the build
# RUN npm install -g serve

# Expose the port the app runs on
# I will be using Nginx to serve the build (port 3000)
EXPOSE 3000

# # Command to run the application
# CMD ["serve", "-s", "dist"]
