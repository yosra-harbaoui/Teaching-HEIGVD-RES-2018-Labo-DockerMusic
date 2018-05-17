FROM node:4.3.1
MAINTAINER Yosra Harbaoui

run npm install moment

EXPOSE 2205

COPY  src /

ENTRYPOINT ["node", "/auditor.js"]