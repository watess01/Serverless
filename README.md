### Strategic Imperative exercise

# Application Architecture Overview

The application delivers 2 REST APIs as lambdas with configuration residing in DynamoDb.
Initial development is local using Serverless Framework with local configs defined using dotEnv

Unit Tests would use jest, which would drive SOLID principle development, where functions do 1 thing and
all dependencies are mocked. That way, tests are isolated, there is no chance of affecting external databases
or infrastructure, errors can be identified quickly, and tests can be simple.

# coding styles

Where time permits, the code is written to be self documenting
Classes have not been used for simplicity. The only class used is DynamoDb which retains the db connection

# TODOs

- Dont use relative paths
- Complete unit tests with 100% coverage.
- Clarify requirements, ie request directions
- Complete `getGateway` - similar to `getSupplier`

# execution

## start the server

The Server can be started at command line with:
`npm run start:si`

## submit a request

From the browser, enter the following in the address bar

### Send

`http://localhost:3000/supplier/BigCorp?characteristics={"name":"LINE_ID","value":"ABC/123"}`

### Returns data

`{"message":"Supplier Characteristics","characteristics":[{"name":"LINE_ID","value":"ABC/123"}]}`

If data sent doesnt match, return:
`{"message":"Supplier Characteristics","characteristics":[]}`

If query data is not well formed, error returns
`message: "Mapping Not Found"`
