const os = require('os');
const cluster = require('cluster');
const express = require('express'), namespace = require('express-namespace');
const bodyParser = require('body-parser');
const conf = require('../config/config.json').DEV;
const numCPUs = os.cpus();
var app = express();
var path = require('path');
//Code to handle multiple request types
app.use(bodyParser.json({ limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));
//app.use(express.json());
app.use(express.static(path.join(__dirname, '../generatedfiles')));
app.use(express.json());

//Code to handle cross-site requests
app.use('/', function(req, res, next){
    res.header("X-Frame-Options", "DENY");
    res.header("Cache-Control", "no-cache", "no-store", "must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send("Node server is running")
});

app.get('/isalive', (req, res) => {
    res.send("Node server is alive")
});


// Clustering to use node on multiple instances
//if(cluster.isMaster)
//{
    // numCPUs.forEach((cpu) => {
    //     const worker = cluster.fork();
    //     worker.send('Hi There');
    // });
//}

//.if(cluster.isWorker)
//{
    // app.listen(parseInt(conf.SERVER.Port), () =>{
    //     console.log('Listening on port '+ conf.SERVER.Port+' for worker ' + cluster.worker.id);
    // });
    //process.on('message', (msg) => {
    //    process.send(msg);
  //  })
//}

//console.log("The url is : http://localhost:" + conf.SERVER.Port);

// if you want to run in localhost without clustering:
//var serverPort = parseInt(conf.SERVER.Port) || 8080;

var serverPort = process.env.PORT || 8080;
app.listen(serverPort, () =>{
        console.log('Listening on : http://localhost:' + serverPort);
    });

module.exports = app;