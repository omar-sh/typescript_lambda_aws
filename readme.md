# An example of typescript with serverless application

## What is project about

 This little project is an example of a typescript code doing CRUD operations on DynamoDB table


## How to run project

1- First of all you need to do `npm install` to install dependencies.

2- you  need then to run `npm run compile` to generate the folder `built` which  contains `js`  files that are generated from `typescript`.

3- you can now do `sls deploy` to deploy your project to AWS.

You will notice after deploying the app that a new yaml file called `.stack-outputs.yml` which contains some data like app url which I will use while doing the e2e test.


## Package I have used

Most of the dependencies I have used are a devDependencies because they are either  typescript modules or testing modules.

**Dependencies** :

[aws-sdk](https://github.com/aws/aws-sdk-js): It has the  whole AWS SDK, I used it to manipulate data in  dynamodb.

[uuid](https://github.com/uuidjs/uuid#readme): I used it for generating unique ids.

[validatorjs](https://github.com/skaterdav85/validatorjs#readme): I used it for validating data.

## Calling app endpoints:

**Create new reservation**:

- you can call  it be issuing a request to  `http://${AWS_URL}/dev/reservation/create`
- you will have to send object data, example data:

```
{
	"pinCodes":{
		"mainDoorCode": 2,
		"roomDoorCode": 1
	},
	"emails":{
		"checkInInfosSent":false,
		"sadsad":"mahrous ks"
	},
}

```

**Update reservation**:

- you can call  it be issuing a request to  `http://${AWS_URL}/dev/reservation/update/{id}`
- you will have to send object data, example data:

```
{
	"pinCodes":{
		"mainDoorCode": 2,
		"roomDoorCode": 1
	},
	"emails":{
		"checkInInfosSent":false,
		"sadsad":"mahrous ks"
	},
}

```
you can send the whole object or a part of it and our api will update data according to the object you send, don't forget to send the `id` as a path parameter.

**Get a reservation**:

- you can call  it be issuing a request to  `http://${AWS_URL}/dev/reservation/get/{id}`
- you will have to send object data, example data:

You will need to send the `id` as a path parameter.

### Explaining helper functions

- you can find this file at `src-ts/utils/helpers.ts`

- This file contains some helper functions like 

`removeAdditionalAttrsFromObject` : I will call this  function inside  `create` and `update` endpoints and `event.body` which  sent  by user  to  remove any additinal fields which is not allowed inside our table.

`generateUpdateExpression` : to generate `ExpressionAttributeValues` for dynamodb update logic.


### Rules file:
file  path at `src-ts/rules`

it  contains reservation object data types for example:

```
export default {
    id: 'required|string',
    emails: {
        bookingConfirmationSent: 'boolean',
        checkInInfosSent: 'boolean'
    },
    pinCodes: {
        mainDoorCode: 'required|numeric',
        roomDoorCode: 'required|numeric'
    }
}
```

I am  validating user data using this file, and I created another file for  update logic which does not require data.

###Endpoints files:

file path  at `src-ts/endpoints`

it contains the files which I pass  to serverless yaml file, files are `create.ts` , `update.ts` and `get.ts` those files are calling the logic from `src-ts/crud/crud.service.ts` which contains logic that are manipulating data  in dynamodb.


##  testing

- you can do testing by calling `npm run test` (you should deploy your app before calling this).

- I used `cucumber`  package for doing e2e test

-  e2e test means imagning a user test the  app by himself and creating a  whole scenario for it

- you can find scenarios I have done inside `tests/crud.feature` 

```
Feature: Reservation CRUD

  Scenario: Add new Reservation
    When we create a reservation
    Then the response should be the newly created object

  Scenario: Update Reservation
    Given reservation object
    When update the reservation
    Then reservation should be updated


```

I have created two scenarios for creating and updating data, and you can find the logic for that inside those two files `tests/create.test.e2e.ts` and `tests/update.test.e2e.ts`.

- I used `serverless-plugin-test-helper` package. A simple package for getting  data  from `.stack-outputs.yml` which generated after deploying the app, and I am using it to get AWS url app.

-  I am using `chai` package for checking if the responses which I am getting are  as expected,
