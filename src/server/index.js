// Empty JS object to act as endpoint for the app
projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
const fetch = require('node-fetch');

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Building my own proxy
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

//** Main GET route **//
app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

//** default GET route **//
app.get('/all', sendData);
function sendData(req, res){    
     res.send(projectData);
}

//** POST route to handle url coming from client side, call the API and send the data to client side **//
app.post('/callAPI', async (req, res) => {

    const apiUrl = req.body.urlBase;
    
    const resp = await fetch(apiUrl)

    try{ //try to send API data to client side

        const data = await resp.json();
        res.send(data);

    }catch(err) {
        
        console.log("error when calling API via server side", err);
    }
})

//** Setup Server **//
const port = 8081;
const server = app.listen(port, listening);

function listening(){
    console.log('Server Running');
    console.log(`Running on localhost: ${port}`);
}