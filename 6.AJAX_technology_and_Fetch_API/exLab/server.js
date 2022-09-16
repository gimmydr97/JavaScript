let http = require("http");
const { parse } = require('querystring');

let arr = [];

let circle = class circle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.radius = Math.round(Math.random()*15);
        this.color = `rgb(${Math.round(Math.random()*256)},${Math.round(Math.random()*256)},${Math.round(Math.random()*256)})`;
    }
}

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

function sendResponse(response, JSONarr) {

      // Send the JSON greeting
      if (typeof JSONarr !== 'undefined') {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Request-Method', '*');
        response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, DELETE');
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSONarr); // Data (response) that we want to send to the web browser
        response.end(); // Sending the response
        
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
            x = url.searchParams.get('x');
            y = url.searchParams.get('y');
            arr.push(new circle(x,y))
            console.log(arr);
            const JSONarr = JSON.stringify(arr); 
            sendResponse(response, JSONarr);
 
        } else {
          response.write('This method is not supported!');
          response.end();
        }
        break;
      default:
        if (request.method === 'POST') {
          
          takeData(request, result => {
            const rand = result.rand;
            if(arr[rand]){ arr.splice(rand,1);}
            const JSONarr = JSON.stringify(arr); 
            sendResponse(response, JSONarr);
          });
          
        } else {
        response.write('This method is not supported!');
        response.end();
        }
    }
  }).listen(8080);
  console.log("The server was started on port 8080");
  console.log("To stop the server, press 'CTRL + C'");
