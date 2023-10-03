import express from "express";
import { Request, Response } from "express";
import { helloWorld } from "./hello";

const serverless = require("serverless-http");
const app = express();

const port = process.env.PORT || 3000;

app.get("/helloWorld", helloWorld);

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });

module.exports.handler = serverless(app);
