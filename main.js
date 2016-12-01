"use strict";

window.onload = init;
var mainApp = angular.module("mainApp", []);

function init() {
    document.querySelector("#generator").onclick = getData;
}

// Functions that control the sliding out summary box
function openSide() {
    document.getElementById("slideout").style.width = "400px";
}

function closeSide() {
    document.getElementById("slideout").style.width = "0";
}

// Function to fetch data from recipe puppy API
function getData() {
    // Build up search query. For now, just do it with a random number and not the specifics 
    var url = "http://www.recipepuppy.com/api/?";
    var randPageNum = Math.floor(Math.random() * 100 + 1);
    
    url += "p=" + randPageNum.toString();
    console.log("results: " + url);
    
    // Call the service and download the results
    $.ajax({
        dataType: "jsonp",
        url: url,
        data: null,
        jsonpCallback: dataFetched
    });
    
}

// Fetched data let's look
function dataFetched(obj){
    console.log("What we got: " + obj);
    console.log("Stringify: " + JSON.stringify(obj));
}