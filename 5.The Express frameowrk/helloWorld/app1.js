// No use of any template system
var express = require('express'),
    logger = require('morgan'),
    fs = require('fs'),
    Mongo = require('mongodb').MongoClient;
var app = express();
var x = 1;
var y = 2;

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Place an HTTP request recorder on the stack — each request will be logged in the console in 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// Route definitions
app.get('/', function (req, res) {     // The first route
    res.send(`${x} + ${y} = ${x + y}`); // Send a response to the browser
});

app.get('/json/:name', (req, res) => {
    let op = JSON.parse(fs.readFileSync(req.params['name']));
    console.log(op);
    res.send(generatetable(op));
});

const uri = 'mongodb://localhost:27017/';

app.get('/calculate/:operation/:x/:y', (req, res) => {
    const x = req.params['x'];
    const y = req.params['y'];
    const op = req.params['operation'];

    let out = getresult(op, x, y);
    res.send(`${x} ${op} ${y} = ${out}`);

    Mongo.connect(uri, (_, client) => {
        db = client.db('operations');
        db.collection('operations').insertOne({
            x: x,
            y: y,
            operation: op,
            result: out
        });
    });
});

app.get('/results', (req, res) => {
    Mongo.connect(uri, (_, client) => {
        db = client.db('operations');
        db.collection('operations').find().toArray((_, operations) => {
            res.send(generatetable(operations));
        });
    });
});

// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});

const getresult = (op, x, y) => {
    x = Number(x);
    y = Number(y);
    switch (op) {
        case "+":
            return x + y;
        case "-":
            return x - y;
        case "*":
            return x * y;
        case "/":
            return x / y;
        case "div":
            return x / y;
    }
};

const generatetable = (op) => {
    let table = `
    <table class="table table-striped">
        <tr>
            <th>x</th>
            <th>Operation</th>
            <th>y</th>
            <th>Result</th>
        </tr>
    `;
    for (let i = 0; i < op.length; i++) {
        let result = getresult(op[i].operation, op[i].x, op[i].y);
        table += `
        <tr>
            <td>${op[i].x}</td>
            <td>${op[i].operation}</td>
            <td>${op[i].y}</td>
            <td>${result}</td>
        </tr>
        `;
    }
    table += '</table>';
    return table;
};
