FROM node:latest as build-image

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY wait-for-it.sh ./


RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Multi-stage build for caching
FROM build-image as runtime-image

# Should match docker volume
# COPY src ./src
# COPY test ./test

EXPOSE 8080

# Default command to run without docker-compose.yml
CMD [ "npm", "test" ]
