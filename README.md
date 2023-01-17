# Animal shelter

This project is for exercise purpose only🧾.

List of used languages, technologies and frameworks in the project.

- Javascript/Typescript
- React
- Bootstrap/React boostrap
- Prisma.IO with postgresql
- Express JS
- Graph QL
- Docker

## Instructions

After cloning the repository go to the main directory and run the following command to install the necessary npm packages.

```
npm install
```

Next run the following command

```
npm run installPackages
```

This command will concurrently install the necessary npm packages for both backend and frontend.

## Running the project

### Running in development

First you need to create `.env` file in `backend` directory and populate it by following `.env.example` file.

This projects uses `postgresql` with `Prisma.IO` for database, so for running the projects you will need to have `Docker` installed on your machine. Next run `docker-compose up` in the main directory, this command will spin up a postgres server.

After everything is set run the following command `npm run dev`
from the main directory which will start server side and back side concurrently.

You can start them independently with the following commands.

```
npm run server - start server side
npm run client - start frontend side
```
