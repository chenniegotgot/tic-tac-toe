# from base image node
FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy other files as well
COPY dist/bundle.js .

#expose the port
EXPOSE 8080

# command to run when intantiate an image
CMD ["node","bundle.js"]
