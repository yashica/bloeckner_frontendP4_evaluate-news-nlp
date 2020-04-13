//import { checkForUrl } from "./urlChecker";

async function handleSubmit(event) {
  event.preventDefault();

  //check what text was put into the url input form field
  const inputUrl = document.getElementById("urlinput").value;
  //get access to the results field
  const resultUI = document.getElementById("results");

  //check, if the url in the input field is a valid url
  //and inform the user, if not
  if (!Client.checkForUrl(inputUrl)) {
    resultUI.textContent = "Not a valid url.";
    return;
  } else {
    resultUI.textContent = "Requesting...";
  }

  //data object for the url
  const urlData = {
    url: inputUrl,
  };

  //send a post request to our server
  //to call aylien to do a nlp processing for the input url
  const res = await postData("/nlp", urlData);

  //display the answer in the result field of the UI
  resultUI.textContent = `The polarity of the article is ${res.pol}.
  Polarity confidence is ${res.con}`;
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
