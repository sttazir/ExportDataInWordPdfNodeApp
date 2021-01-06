var app = require('./route/app');
var route = require('./route/route');
var fs = require('fs');

createDirectory();

function createDirectory()
{
    if(!fs.existsSync('./generatedfiles'))
    fs.mkdir('./generatedfiles', (err) => {
        console.log("Directory Created");
    })
}