// imports
const request = require("request");

// fetchPage: fetch url and pass data to callback function when done
const fetchPage = (url, done) => {
  request(url, (error, response, body) => {
    if (error) return console.error("fetchPage error:", error);
    
    // console.log("statusCode:", response && response.statusCode); // Print the response status code IF a response was received
    if (response) {
      if (response.statusCode === 200) {
        // console.log("body:", body);
        // console.log("fetchPage: got it!");
        // callback on success
        done(body);
      } else {
        console.warn(
          `Ooops, couldn't fetch the page because the server returned statusCode ${response.statusCode}!`
        );
      }
    }
  });
};

// parseResults: parse and print final results
const parseResults = (data) => {
  //console.log("DATA:", data);
  // console.log(typeof data);
  // serialize data
  const jsonData = JSON.parse(data);
  if (!jsonData || !jsonData.length)
    return console.warn("Sorry, no cat found... Miauw!");
  // console.log(jsonData);
  // print description
  console.log(jsonData[0].description);
  // console.log(typeof jsonData);
};

// init: get command line arguments and initiate fetching
const init = () => {
  // get command line arguments
  const args = process.argv;
  // console.log(args);
  if (!args[2]) {
    console.warn("Missing argument: provide breed");
  } else {
    // console.log("init: Go fetching...");
    // build url
    const apiUrl = "https://api.thecatapi.com/v1/breeds/search?q=";
    const breed = args[2];
    const url = apiUrl + breed;
    // initiate fetching and parsing
    fetchPage(url, parseResults);
  }
};

// run
init();