// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));



// sending GET request
app.get('/all', getAll);

function getAll(req, res){
    res.send(projectData);
}

// sending POST request
app.post('/add', postData);

function postData(req, res){
    projectData = req.body;
    res.send(projectData);
    console.log("The data pushed is "+projectData);
}



var listenPort = 4444;
var server = app.listen(listenPort, () =>{
    console.log(`stating server on port ${listenPort}`)
});