"use strict";

// The Angular app does not like the IIFE, so he's gonna stay out here.
var mainApp = angular.module("mainApp", []);

// Wrap it in a IIFE
(function() {

	// Assigns all the buttons not making queries their functions
	window.onload = function() {
		document.querySelector('#sliderButton').onclick=openSide;
		document.querySelector('#closeSlider').onclick=closeSide;
		document.querySelector('#calendarButton').onclick=changeView;
		document.querySelector('#listButton').onclick=changeView;
	}

	// Controls the sliding out summary box
	function openSide() {
	    document.getElementById("slideout").style.width = "400px";
	}

	function closeSide() {
	    document.getElementById("slideout").style.width = "0";
	}

	// Changes if you're looking at the shopping list or the recipes
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

})();
