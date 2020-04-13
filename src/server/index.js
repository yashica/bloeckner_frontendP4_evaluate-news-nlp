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
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

/* Start up an instance of app */
const app = express();

/* Middleware*/
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
//basic get request route - returns our index.html
app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

//post request: call aylien to do nlp test for news article at given url
app.post("/infoURL", function (req, res) {
  console.log(req.body);
  const reqURL = req.body.url;
  console.log(reqURL);
  if (textApi) {
    //call aylien for nlp processing of url input
    textApi.sentiment(
      {
        //url of news article for aylien nlp request
        url: reqURL,
      },
      (error, response) => {
        if (error === null) {
          //the response from aylien
          console.log(response);
          res.json({
            pol: response.polarity,
            con: response.polarity_confidence,
          });
        } else {
          //in case of error
          res.json({
            message: error,
          });
        }
      }
    );
  }
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
