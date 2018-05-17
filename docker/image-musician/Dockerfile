FROM node:4.3.1
MAINTAINER Yosra Harbaoui

run npm install moment
run npm install node-uuid

EXPOSE 2205

COPY src /

ENTRYPOINT ["node", "/musician.js"]