FROM node:6-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install 
COPY . .
EXPOSE 4000
CMD node node_modules/gulp/bin/gulp.js