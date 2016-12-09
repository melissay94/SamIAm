"use strict"

// Import http package for running the server
var http = require('http');

// Import query string for decoding query strings and request parameters
var queryString = require('querystring');

// Import request library for ajax requests - Installed with npm
var requester = require('request');

// Import fs library for file sync
var fs = require('fs');

// Says which port to run on, the default being 3000
var port = process.env.PORT || 3000;

// And now for the CORS support <-- Stupid CORS
var responseHeaders = {
    "access-control-allow-origin": "*", // Page urls allowed to access CORS
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS", // HTTP methods allowed to run
    "access-control-allow-headers": "Content-type, accept", // Headers to accept the client
    "access-control-max-age": 10, // Number of seconds to allow each request to come in
    "Content-Type": "application/json" // Type of response to send back
};

// Handles page requests
var onRequest = function(request, response) {
    
    // Breaking up the requested url by ? to get the query string
    var query = request.url.split('?')[1];
                                   
    // Parse the result into a js object
    var params = queryString.parse(query);
    
    // Check first if the request is a query 
    if (!params.url) {
        
        // If not, it might be a local resource
        if (request.url) {
             // Check if a url came in with a local request
            switch(request.url){
                case '/':
                    getIndex(request, response);
                    break;
                case '/style.css':
                    getCSS(request, response);
                    break;
                case '/js/main.js':
                    getMain(request, response);
                    break;
                case '/js/generatorController.js':
                    getController(request, response);
                    break;
                // If no url matches, sends the following message
                default:
                    console.log("Request not found: ", request.url);
                    break;

            }
        }
        // If it's not a query, and it's not  local file, then it assumes its a missing paramenter
        else {
            response.writeHead(400, responseHeaders);
            var responseMessage = {
              message: "Missing URL parameter. Request denied for " + request.url
            };
            response.write(JSON.stringify(responseMessage));
            response.end();
        }
        // Return after it finds if its a file or just a missing parameter
        return;
    } 
    
    // Passes as having a query, tries to send the header
    try {
        // Writes 200 status and sends CORS header to allow access for the client
        response.writeHead(200, responseHeaders);
        requester(params.url + '?p=' + params.p).pipe(response);
        console.log('resulting url: ', params.url + '?p=' + params.p);
    }
    catch(exception) {
        // If the URL is invalid, 500 error sent
        console.dir(exception);
        response.writeHead(500, responseHeaders);
        
        var responseMessage = {
            message: "Error with connecting to server. Please check the format of your request"
        };
        
        response.write(JSON.stringify(responseMessage));
        
        response.end();
    }
    
};

// Gets the homepage
var getIndex = function(request, response) {
    var index = fs.readFileSync(__dirname + "/../index.html");
    response.writeHead(200, { 'Content-type' : 'text/html'});
    response.write(index);
    response.end();
};

// Gets the styles for the site
var getCSS = function(request, response) {
    var css = fs.readFileSync(__dirname + "/../style.css");
    response.writeHead(200, { 'Content-type' : 'text/css'});
    response.write(css);
    response.end();
}

// Gets the main js file
var getMain = function(request, response) {
        var main = fs.readFileSync(__dirname + "/../js/main.js");
        response.writeHead(200, { 'Content-type' : 'application/javascript'});
        response.write(main);
        response.end();
}

// Gets the controller js file 
var getController = function(request, response) {
    var controller = fs.readFileSync(__dirname + "/../js/generatorController.js");
    response.writeHead(200, { 'Content-type' : 'application/javascript'});
    response.write(controller);
    response.end();
}

// Gets list controller
/* var getListCtrl = function(requests, response) */

// Create the server and sends those requests on their way
http.createServer(onRequest).listen(port);
console.log("Listening to localhost: ", port);