# Overall File Structure is as Follows:

.
├── backend
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── ....
├── docker-compose.yml
├── frontend
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── ....
├── nginx
    └── local.conf

# Docker Code in frontend/Dockerfile:

FROM node:16-alpine
RUN apk add python3 make g++ 
USER node 
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
RUN npm i
COPY --chown=node:node . ./
EXPOSE 3000
RUN npm run build
CMD npx serve -s build -l 3000

# Docker Code in frontend/.dockerignore:

node_modules
build

# Docker Code in backend/Dockerfile:

FROM node:16-alpine
RUN apk add python3 make g++ 
USER node 
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
RUN npm i
COPY --chown=node:node . ./
EXPOSE 5000
CMD npm start

# Docker Code in backend/.dockerignore:

Same Code as present in frontend/.dockerignore

# Docker Code in nginx/local.conf:

worker_processes  1;


events {
    worker_connections  1024;
}

http {

    upstream backend_server {
        server backend:5000;
    }
  
    upstream frontend_server {
        server frontend:3000;
    }
  
    server {
        listen 8080;
        server_name localhost;
        client_max_body_size 8M;
  
        location /api/ {
            proxy_pass http://backend_server;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
  
        location / {
            proxy_pass http://frontend_server;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
  
        location /socket.io/ {
            proxy_pass http://backend_server;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}

# docker-compose.yml:

version: '3.1'

services:
    backend:
      build: ./backend
      environment:
        - PORT=5000
      restart: unless-stopped
      networks:
        - web-network


    frontend:
      build: ./frontend
      environment:
        - PORT=3000
      networks:
        - web-network
    nginx:
      image: nginx
      container_name: webserver
      restart: unless-stopped
      depends_on:
        - backend
        - frontend
      ports:
        - 8080:8080
      volumes:
        - ./nginx/local.conf:/etc/nginx/nginx.conf
      networks:
        - web-network

networks:
  web-network:
    driver: bridge

# How to run:

to build (Follow these Steps whenever you update your files) :

sudo docker-compose build

to start:

sudo docker-compose up

to stop:

sudo docker-compose down


Assumptions Made:
1) Multiple Schemas have been made in addition to those mentioned in the PDF to have a Better Understanding of the Database Structure
2) It is assumed that Username and Email, both are unique in the Code and that no User can Register having Email or Username Credentials that are already saved in the Database. 
3) Everything is done as mentioned in the pdf for Rest of the Things Mentioned in the PDF.
4) Fuzzy Search Bonus is also Implemented.
5) Link to Part 1 of the Assignment Website hosted on Netlify - https://mellifluous-mooncake-44657b.netlify.app/