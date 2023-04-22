# node-express-pg



## Architecture

```
    .
    └── controllers
    └── db
        └── migrations
    └── middlewares
    └── routes
    └── src/
        ├── drivers
        │   └── models
        ├── doas
```

## Pre-requisites
- yarn
- docker

## Steps to setup DB locally 

- yarn local:db:up
- ./setup-local.sh

These steps will spin a docker environmnet & create a new database for you locally 

## Steps to run application locally

- yarn dev

## APIs

1. API to create user in database while data fetching from the csv

```
curl --location --request POST 'http://localhost:5000/api/v1/user'

```

2. API to fetch user data based on email

```
curl --location --globoff 'http://localhost:5000/api/v1/user?email={{emailId}}'

```