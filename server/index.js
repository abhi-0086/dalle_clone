import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";

//configure dotenv
dotenv.config();

//app
const app = express();
app.use(cors()); //enable cors for all requests by using cors middleware
app.use(express.json({ limit: "50mb" })); //enable json parsing for all requests by using express.json middleware (limit 50mb) - for large images and files to be uploaded to the server

//app.get() is a method in Express to handle GET requests
//"/" is the path of the request
//req is the request object
//res is the response object
//res.send() is a method in Express to send a response
//we are sending the string "Hello World" as the response
app.get("/", async (req, res) => {
  res.send("Hello World");
});

//start server
const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(8080, () =>
      console.log("Server is running on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

//why are we using async await here?
//because we are using dotenv to load environment variables from a .env file into process.env
//dotenv is asynchronous
//so we need to wait for dotenv to finish loading the environment variables before we start the server
startServer();
