
mainApp.controller('generatorCtrl', ["$scope", "$http", function($scope, $http){
    
    $scope.results = [];
    $scope.recipeList = [
        {day: "Monday", meals: []}, 
        {day: "Tuesday", meals: []}, 
        {day: "Wednesday", meals: []}, 
        {day: "Thursday", meals: []}, 
        {day: "Friday", meals: []}
    ];
    $scope.foodList = [];
    
    $scope.getData = function() {
        // Build up search query. For now, just do it with a random number and not the specifics 
        var my_data;
        var url = "/?url=http://www.recipepuppy.com/api";
        var randPageNum = Math.floor(Math.random() * 100 + 1);

        url += "p=" + randPageNum.toString();
        console.log("results: " + url);

        // Call the service and download the results
        /**var temp = $.getJSON("https://crossorigin.me/http://www.recipepuppy.com/api/?p=78", function(data){
            my_data = dataFetched(data);
            localStorage.test = JSON.stringify(my_data);
            console.log(my_data, " ", url)
        });**/
        //console.log("my page: ", randPageNum);
        /*$.ajax({
            dataType: "json",
            url: url,
            data: {"p": randPageNum.toString()},
            success: dataFetched
        });*/

        $http.get("http://www.recipepuppy.com/api/?p=47").then(dataFetched);
        
        my_data = JSON.parse(localStorage.test);
        // $scope.results = my_data.results;
        $scope.results = [
            { title: "Mexican Fiesta Bowl", ingredients: "Chicken Breasts, White Rice, Garlic, Black Beans, Limes, Bell Peppers, Red Onions, Diced Tomatoes, Corn"},
            { title: "American StirFry", ingredients: "Chicken Breasts or Pork Chops, White Rice, StirFry Sauce, White Onions, Bell Peppers, Broccoli, Carrots, Water Chestnuts, Baby Corn"},
            { title: "Brazilian Okra Stew", ingredients: "Chunk Steak, White Rice, Diced Tomatoes, Okra, Garlic, White Onions"}, 
            { title: "Mamazinha's Cheese Bread", ingredients: "Cheese bread flour, chedder jack cheese, bell peppers, ham, eggs, water"}
            ];
        console.log("trying something: ", $scope.results);
    }
    
    // Fetched data let's look
    function dataFetched(obj){
        
        if (obj.results.length == 0) {
            console.log("No recipes found");
        }
        
        else {
            localStorage.test = JSON.stringify(obj.data);
            console.log('Data: ' + localStorage.test);
        }
    }

    // Need to add functionality for buttons
    $scope.daySelect = function(day, recipe) {
        
        // First, when the button is clicked, get that week day from scope.results
        

        // Next, get that weeks meal list & check if that recipe is already there

        // If it isn't add it to the meals list

        // Send the title of the recipe to the view for the schedule made
            // Should display as a drop down using ng-repeat

        // Send the ingredients of the recipe to the shopping list
            // Check the lists for if those ingredients are already there
            // If not, append it as a key value of "food":"occurance = 1"
            // If yes, iterate the occurance value of that food up one
    }
}]);