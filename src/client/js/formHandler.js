//import { checkForUrl } from "./urlChecker";

async function handleSubmit(event) {
  event.preventDefault();

  console.log("In formHandler.js: Button Click!!");

  //check what text was put into the url input form field
  const inputUrl = document.getElementById("name").value;
  //get access to the result y
  const resultUI = document.getElementById("results");

  //check, if the url in the input field is a valid url
  //and inform the user, if not
  if (!Client.checkForUrl(inputUrl)) {
    resultUI.textContent = "Not a valid url.";
    return;
  } else {
    resultUI.textContent = "Url was valid.";
  }

  //data object for the url
  const urlData = {
    url: inputUrl,
  };

  //send a post request to our server
  //to call aylien to do a nlp processing for the input url
  const res = await postData("/infoURL", urlData);

  //display the answer in the result field of the UI
  resultUI.textContent = `The polarity is ${res.pol} and 
  polarity confidence is ${res.con}`;

  // check what text was put into the form field
  /*   let formText = document.getElementById("name").value;
  Client.checkForName(formText);

  console.log("::: Form Submitted :::");
  fetch("http://localhost:8080/test")
    .then((res) => res.json())
    .then(function (res) {
      document.getElementById("results").innerHTML = res.message;
    }); */
}

//send a post request to our server
//to call aylien to do a nlp processing for the input url
async function postData(url = "", data = {}) {
  console.log("In postData: url = " + url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export { handleSubmit, postData };
