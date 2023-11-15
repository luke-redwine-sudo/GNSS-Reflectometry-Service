# Use a lightweight Node.js image as the base image
FROM node:alpine

# Set the working directory within the container
WORKDIR /app

# Copy the frontend files to the container
COPY . .

# Install dependencies, including http-server
RUN npm install -g http-server

# Expose port 80
EXPOSE 80

# Command to start the web server
CMD ["http-server", "-p", "80"]
