
### Dependencies

- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- [Typescript](https://www.typescriptlang.org/download)
- [Docker](https://www.docker.com/products/docker-desktop)

## How to run locally?

- First create `.env.development` file in the root directory and put the following content in it

```
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://my_user:password123@localhost/pop-dev

```

- Create another `.env.test` for testing and copy this content inside it

```
PORT=3001
NODE_ENV=test
MONGO_URI=mongodb://my_user:password123@localhost:27018/pop-test

```

- Use the following steps to run the application

Step 1. `yarn install` to install dependencies

Step 2. `yarn start:db` to spin up local development and test mysql database in docker container
*** it takes about 3-5 seconds for the DB container to fully spin up ***
Tip: You can make a simple `GET` request to the `/api/v1/health` (see [here](https://documenter.getpostman.com/view/3683187/UVXqEXte)) check endpoint to see if the database and other system components are up and running. 

Step 3. `yarn start:dev` to start the application locally

## How to test? 

`yarn test`

## Endpoints

Please see the Postman collection here: https://documenter.getpostman.com/view/3683187/UVXqEXte

## Things to note 

- I used MongoDB as my database to persist tickets.
- I added `/health` checkendpoint to check if database connection is okay and also if overall system is working as expected. In a production ready system we can integrate monitoring/telemetry systems and APMs like `new relic`, `prometheus`+`grafana` etc
- I containerized both development and test databases. See the command [here](https://github.com/SirPhemmiey/lottery-game#how-to-run-locally) to know how to spin it up in just one single command. 
- I added input validations using Joi library

### Patterns and Principles used in the project

```
https://github.com/SirPhemmiey/fct/blob/master/IDEAS.md
```