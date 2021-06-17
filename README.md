# WEBSITE BLOG

## Build with Docker

### **Launch the project** <br/>

`cd ./Website-Blog` <br/>
Use data in file .dockerfile.env replace in file .env then run command below
`docker-compose up`

Backend is launched at `http://localhost:5002/api` <br/>
Database is launched at `http://localhost:3307`

If you are facing any issue, you can delete anoynmous container and force a rebuilt of your containers using : <br/>
`docker-compose up -V --build`

### **Clean your docker** <br/>

`docker rm -f $(docker ps -a -q)` <br/>
`docker system prune -a -f --volumes`
