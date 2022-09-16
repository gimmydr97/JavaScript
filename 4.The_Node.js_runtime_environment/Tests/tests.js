var fs = require('fs');
var pdf = require('html-pdf');
    
    function requestListener(request, response) {
        console.log("--------------------------------------");
        console.log("The relative URL of the current request: " + request.url + "\n");
        var url = new URL(request.url, `http://${request.headers.host}`); // Create the URL object
        if (url.pathname == '/submit') { 
            
            console.log("Creating a response header");
            response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            console.log("Creating a response body");

            if (request.method == 'GET'){
                var questions = "";
                var answere= "";
                for(var i = 1 ; i <= 3 ; i++){
                    questions = questions + `<p>${i}.${url.searchParams.get(`q${i}`)}</p>\n`;
                    answere = answere + `<p>${i}.${url.searchParams.get(`a${i}`)}</p>\n`;
                }
                const opzioni = {
                mode: 0o600,
                }
                
                fs.writeFile('answere.html', answere,  opzioni, (errore) => {
                    if ( errore ) { console.log("errore");throw errore; }

                    console.log("answere file genereted");
                    var options = { format: 'Letter' };
                    var html = fs.readFileSync('./answere.html', 'utf8');
                    console.log(html);

                    pdf.create(html, options).toFile('./answers.pdf', function(err, res) {
                        if (err) return console.log(err);
                        console.log(res);
                        fs.unlink('answere.html', function(errore) {
                            if (errore) throw errore;
                          });
                    }); 
                });

                fs.writeFile('questions.html', questions,  opzioni, (errore) => {
                    if ( errore ) { console.log("errore");throw errore; }
                    response.write(questions);
                    response.end();
                });
                   
            }
            else{ 
                response.write(`This application does not support the ${request.method} method`);
                response.end();
            }
            
            
        }
        else { 
            console.log("Creating a response header")
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            console.log("Creating a response body");
            response.write(`<form method="GET" action="/submit">
                                <label for="name">Questions:</label>
                                <input type="text" name="q1">
                                <input type="text" name="q2">
                                <input type="text" name="q3">
                                <br>
                                <br>
                                <label for="name">Answers:\n\n </label>
                                <input type="text" name="a1">
                                <input type="text" name="a2">
                                <input type="text" name="a3">
                                <br>
                                <br>
                                <input type="submit" value="submit">
                            </form>`);
            console.log("Sending the response");
            response.end();  
        }
    }
    
    var http = require("http");
    
    var server = http.createServer(requestListener); 
    server.listen(8080);
    console.log("The server was started on port 8080");
    console.log("To stop the server, press 'CTRL + C'");
    
    async function makeDocument(fields) {
        const testo = `<p>${fields.get("q1")}</p>`;
        console.log(testo);
        const opzioni = {
        mode: 0o600,
        }

        fs.writeFile('questions.html', testo,  opzioni, (errore) => {
            if ( errore ) { console.log("errore");throw errore; }
            console.log('Funzione writeFile() eseguita correttamente!');
        });
    }
