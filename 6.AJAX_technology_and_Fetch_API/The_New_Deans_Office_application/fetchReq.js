var http = require("http");
var mongoose = require('mongoose');
const student = require('./student');
mongoose.connect('mongodb://localhost:27017/');

function sendResponse(response, list) {
  
     var welcomeText = `${list}`;  
  
    if (typeof welcomeText !== 'undefined') {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Request-Method', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      response.write(welcomeText); // Data (response) that we want to send to the web browser
      response.end(); // Sending the response
      console.log("The server sent the '" + welcomeText + "' text to the browser");
    }
  
  }
  
http.createServer(function (request, response) {
  console.log("--------------------------------------");
  console.log("The relative URL of the current request: " + request.url + "\n");
  var url = new URL(request.url, `http://${request.headers.host}`); // Create the URL object
  //Compare the relative URL
  switch (url.pathname) {


    // Process the form content if relative URL is '/submit'
    case '/submit':
      if (request.method === 'GET') {
          const nameL = url.searchParams.get('name');
          student.find({},'name',function(err,studs){
            let list = "";
            for(let i=0;i<studs.length;i++){
              if(studs[i].name.startsWith(nameL)){
                list = list + studs[i].name + "<br />";
              }
              
            }
            sendResponse(response, list);
          });
          
        } else {
        response.write('This method is not supported!');
        response.end();
      }
  } 
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To stop the server, press 'CTRL + C'");