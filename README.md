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

events {
    worker_connections  1024;
}
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
