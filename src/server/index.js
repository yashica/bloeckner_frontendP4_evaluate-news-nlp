var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");

var AYLIENTextAPI = require("aylien_textapi");
var textapi = new AYLIENTextAPI({
  application_id: "2cde9ead",
  application_key: "1404bb62f2a70203aeec19aec6f890dd",
});

const app = express();

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

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
