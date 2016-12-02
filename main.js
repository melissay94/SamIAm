"use strict";
var mainApp = angular.module("mainApp", []);

// Functions that control the sliding out summary box
function openSide() {
    document.getElementById("slideout").style.width = "400px";
}

function closeSide() {
    document.getElementById("slideout").style.width = "0";
}
