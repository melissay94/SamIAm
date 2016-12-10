"use strict";
var mainApp = angular.module("mainApp", []);

// Functions that control the sliding out summary box
function openSide() {
    document.getElementById("slideout").style.width = "400px";
}

function closeSide() {
    document.getElementById("slideout").style.width = "0";
}

function changeView() {
	console.log("Hello");
	var element_1 = document.getElementById("recipeSchedule");
	var element_2 = document.getElementById("shoppingList");

	if (element_1.style.display == "none"){
		element_1.style.display = "block";
		element_2.style.display = "none";
	}
	else {
		element_1.style.display = "none";
		element_2.style.display = "block";
	}
}

mainApp.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
