# https://docs.docker.com/samples/library/node/
ARG NODE_VERSION=16.14.0

# Build container
FROM node:${NODE_VERSION}-alpine
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

# Create app directory
RUN mkdir -p /home/node
WORKDIR /home/node

# Install app dependencies
COPY . /home/node

# If you are building your code for production
# RUN npm ci --only=production
RUN rm -rf node_modules && rm -rf package-lock.json && npm i

EXPOSE 3000
CMD npm run build && npm run start


