"use strict"

var http = require('http');
var port = process.env.PORT || 3000;
var fs = require('fs');

var onRequest = function(request, response) {
    switch(request.url){
        case '/index':
            getIndex(request, response);
            break;
    }
};

var getIndex = function(request, response) {
    var index = fs.readFileSync(__dirname + "/../index.html");
    response.writeHead(200, { 'Content-type' : 'text/html'});
    response.write(index);
    response.end();
};

http.createServer(onRequest).listen(port);
console.log("Listening to localhost: ", port);