# Use an official Python runtime as a parent image
FROM node:latest

# Set the working directory in the container
# WORKDIR /app/soccer-proleagues-frontend
WORKDIR /app

# add to $PATH
# ENV PATH /usr/src/soccer-proleagues-frontend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json package-lock.json ./

# RUN npm ci
# RUN npm install react-scripts@5.0.1 -g --silent
# RUN npm install react-scripts@5.0.0 -g --silent
RUN npm install


# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000
EXPOSE 4000
EXPOSE 5001


# start app
CMD ["npm", "start"]