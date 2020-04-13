//setup use of Environment Variables
const dotenv = require("dotenv");
dotenv.config();

// Empty JS object to act as endpoint for all routes
let projectData = {};

/* Dependencies */
var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mockAPIResponse = require("./mockAPI.js");
//Require the Aylien npm package
var AYLIENTextAPI = require("aylien_textapi");

// set aylien API credentials
var textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID, //"2cde9ead", //`${process.env.application_id}`,
  application_key: process.env.API_KEY, //"1404bb62f2a70203aeec19aec6f890dd", //`${process.env.application_key}`,
});

/* Start up an instance of app */
const app = express();

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static("dist"));
console.log(__dirname);

/* Spin up the server*/
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

console.log("TEST TEST TEST");

/* routes */
app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

//aylien test
textapi.sentiment(
  {
    text: "John is a very good football player!",
  },
  function (error, response) {
    if (error === null) {
      console.log(response);
    }
  }
);
