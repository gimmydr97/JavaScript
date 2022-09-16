// Application using the 'Pug' template system
var express = require('express'),
    fs = require('fs'),
    logger = require('morgan'),
    Mongo = require('mongodb').MongoClient;

var app = express();
var x = 1;
var y = 2;

// Configuring the application
app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          // Use the 'Pug' template system

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

const uri = 'mongodb://localhost:27017/';

app.get('/calculate/:operation/:x/:y', (req, res) => {
    const x = req.params['x'];
    const y = req.params['y'];
    const op = req.params['operation'];

    let out = getresult(op, x, y);
    res.render('calc', {
        pretty:true,
        x:x,
        y:y,
        op:op,
        out: out
    });

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
            res.render('table', {
                pretty:true,
                table:generatetable(operations)
            });
        });
    });
});

app.get('/json/:name', (req, res) => {      // The first route
    let op = JSON.parse(fs.readFileSync(req.params['name']));
    res.render('table', {
        pretty:true,
        table:generatetable(op)
    });
});
// Route definitions
app.get('/', function (req, res) {      // The first route
    res.render('index', {
        pretty:true,
        x:x,
        y:y
    }); // Render the 'index' view in 'pretty' mode — the resulting HTML code will be indented — the 'pretty' option has the 'deprecated' status — in the future it will not be supported
    //res.render('index '); // Render the 'index' view; because the 'pretty' mode is, by default, turned off so the resulting HTML will be without indentation
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