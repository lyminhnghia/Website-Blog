# WEBSITE BLOG

## backend

## Build app

Step 1 : get the code

- git clone

Step 2 : prepare your environment

- Install Docker on your machine.

Step 3 : Launch docker

- At the end of the installation, don't forget to launch docker.
- When the whale icon in the status bar stays steady, Docker Desktop is up-and-running, and is accessible from any terminal window.

Step 4 : launch the project
cd ./website-blog
docker-compose up

- Backend is launched at http://localhost:5000/api
- Database is launched at http://localhost:3306

Install packages

- If you want to install a package with npm, you can npm install it locally.
- A watcher in the container is waiting for changes in your package.json and package-lock.json to replicate the installation you have done locally.

If you are facing any issue, you can delete anoynmous container and force a rebuilt of your containers using:

- docker-compose up -V --build

Logs

- If you want to ease your usage of Docker containers, you can download Docker Desktop

Clean your docker

- docker rm -f $(docker ps -a -q)
- docker system prune -a -f --volumes
