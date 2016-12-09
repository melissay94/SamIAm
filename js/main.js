"use strict";
var mainApp = angular.module("mainApp", []);

// Functions that control the sliding out summary box
function openSide() {
    document.getElementById("slideout").style.width = "400px";
}

function closeSide() {
    document.getElementById("slideout").style.width = "0";
}

mainApp.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
