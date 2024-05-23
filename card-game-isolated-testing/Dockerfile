# Use an official Node.js runtime as a parent image
FROM node:20-alpine

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
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5143

# Command to run the application
CMD ["serve", "-s", "dist"]
