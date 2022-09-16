var http = require("http");
var fs = require("fs");
const { parse } = require('querystring');
const file = 'form.html';

function takeData(request, callback) {
    
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
      let body = '';
      request.on('data', chunk => {body += chunk.toString();});
      request.on('end', () => {callback(parse(body)); });
    }
    else {
      callback(null);
    }
  }

function sendResponse(response, name) {
    // Only one of the three lines below can be uncommented
    var welcomeText = `Hello ${name}`;                      // Plain text greeting
    // var welcomeXML = `<welcome>Hello ${name}</welcome>`; // XML greeting
    // var welcomeJSON = `{"welcome":"Hello ${name}"}`;     // JSON greeting
  
    // Send the plain text greeting
    if (typeof welcomeText !== 'undefined') {
      response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      response.write(welcomeText); // Data (response) that we want to send to the web browser
      response.end(); // Sending the response
      console.log("The server sent the '" + welcomeText + "' text to the browser");
    }
  
    // Send the XML greeting
    if (typeof welcomeXML !== 'undefined') {
      response.writeHead(200, { "Content-Type": "application/xml" });
      response.write(welcomeXML); // Data (response) that we want to send to the web browser
      response.end(); // Sending the response
      console.log("The server sent the '" + welcomeXML + "' text to the browser");
    }
  
    // Send the JSON greeting
    if (typeof welcomeJSON !== 'undefined') {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(welcomeJSON); // Data (response) that we want to send to the web browser
      response.end(); // Sending the response
      console.log("The server sent the '" + welcomeJSON + "' text to the browser");
    }
  }
  
http.createServer(function (request, response) {
  console.log("--------------------------------------");
  console.log("The relative URL of the current request: " + request.url + "\n");
  var url = new URL(request.url, `http://${request.headers.host}`); // Create the URL object
  //Compare the relative URL
  switch (url.pathname) {

    // if relative URL is '/' then send, to a browser,
    // the contents of a file (an HTML document) - its name contains the 'file' variable
    case '/':
      fs.stat(file, function (err, stats) {
        if (err == null) { // If the file exists
          fs.readFile(file, function (err, data) { // Read it content
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.write(data);   // Send the content to the web browser
            response.end();
          });
        }
        else { // If the file does not exists
          response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          response.write(`The '${file}'file does not exist`);
          response.end();
        } //else
      }); //fs.stat
      break;

    // Process the form content if relative URL is '/submit'
    case '/submit':
      if (request.method === 'POST') {
        takeData(request, result => {
          const name = result.name;
          console.log(name);
          sendResponse(response, name);
        });
      } else if (request.method === 'GET') {
        const name = url.searchParams.get('name');
        console.log(name);
        
        sendResponse(response, name);
      } else {
        response.write('This method is not supported!');
        response.end();
      }
  } 
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To stop the server, press 'CTRL + C'");