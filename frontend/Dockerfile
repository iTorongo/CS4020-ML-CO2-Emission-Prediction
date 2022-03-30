# Build step #1: build the React front end
# FROM node:lts-alpine as build-step
# WORKDIR /usr/src/app
# COPY package.json yarn.lock ./
# RUN yarn
# COPY . ./
# RUN yarn build

FROM node:14-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /dashboard
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "start" ]
