const fs = require('fs');
const file = 'datetime.html';

function onRequest_8080(request, response) {
    fs.stat(file, function (err, stats) {
        if (err == null) {
          fs.readFile(file, function (err, data) {
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.write(data);
            response.end();
          });
        }
        else {
          response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          response.write(`The '${file}'file does not exist`);
          response.end();
        }
      });
  }
  
  function onRequest_8081(request, response) {
    const date = new Date();

    const datetimeXML =
  `<div>
    <span id='date'> ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} </span>
    <span id='time'> ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} </span>
  </div>`;
  
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.writeHead(200, { "Content-Type": "application/xml" });
    response.write(datetimeXML);
    response.end();
  }
  
  /* ************************************************** */
  /* Main block
  /* ************************************************** */
  var http = require('http');
  
  http.createServer(onRequest_8080).listen(8080);
  http.createServer(onRequest_8081).listen(8081);
  console.log("The server was started on port 8080 and 8081");
  console.log("To stop the server, press 'CTRL + C'");