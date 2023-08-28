# GitHub Top Repository Ranking

A simple service to get top-rated GitHub repositories.

### Requirements and technologies
- JavaScript - A high-level programming language.
- Node.js - As an asynchronous event-driven JavaScript runtime. Nodejs is designed to build scalable network applications.
- NestJs - NestJS is a framework for building efficient, scalable Node.js server-side applications.
- Docker - Docker is a tool designed to make it easier to create, deploy, and run applications by using containers.
- Docker Compose - A tool for defining and running multi-container Docker applications
- Nginx - Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.

### Technical Specification
A service that fetches top-rated GitHub repository by date, languages and returned results can be limited to a provided count.

### Setup Specification
First, create a file with the name `.env` in the root of the service/repository and add the below entry into the `.env` file.

```bash
# .env
BASE_URL=https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data
```

### Docker deployment
Docker and docker-compose can be used to deploy this service.

- Ensure you have `docker` and `docker-compose` installed
- Clone this repository
- `cd` into the repository
- Run `docker-compose up` to build and start the service in cluster mode
- Access the docs `Swagger` docs webpage at `http://localhost:8085/docs`
- Access the endpoint on `http://localhost:8085/v1`

### Local deployment
- Clone this repository
- Open a terminal, `cd` into the repository and run `yarn install` or `npm install` to install dependencies.
- Then run `yarn start:dev` or `npm run start:dev` to run the service locally.

### Features
- Get all top-rated repositories for a given date.
- Filter return results by language.
- Limit returned results count.

### Endpoint
http://localhost:8085/v1

**Example**

Structure
```bash
# structure
http://localhost:8085/v1/rank/{{date}}/q?language={{language}}&limit={{limit}}

# sample url
http://localhost:8085/v1/rank/2023-01-21/q?language=JavaScript&limit=10
```

**Parameters**

|Parameter    |Type        |Required       |Default       |
|-------------|------------|---------------|--------------|
| date        |string      |true           |null          |
| language    |string      |false          |null          |
| limit       |number      |false          |null          |

**_Note_**

If `language` and `limit` query parameters are not provided, then the entire records for that `date` will be returned.

### Documentation
The Swagger documentation can be accessed in the browser when the service is up and running at the below location:

```bash
http://localhost:8085/docs
```