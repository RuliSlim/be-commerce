# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci
# RUN npm install bcrypt

# Rebuild docker
# RUN npm rebuild bcrypt --build-from-source

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
