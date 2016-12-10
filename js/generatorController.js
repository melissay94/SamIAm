
mainApp.controller('generatorCtrl', ["$scope", "$http", function($scope, $http){
    
    $scope.results = []; 
    $scope.currentList = [
        {title: "Monday", recipes: [] },
        {title: "Tuesday", recipes: [] },
        {title: "Wednesday", recipes: [] },
        {title: "Thursday", recipes: [] },
        {title: "Friday", recipes: [] }];

    $scope.shoppingList = [];
    
    $scope.getData = function() {
        // Build up search query. For now, just do it with a random number and not the specifics 
        var my_data;
        var url = "/?url=http://www.recipepuppy.com/api";
        var randPageNum = Math.floor(Math.random() * 100 + 1);
        
        $.ajax({
            dataType: "json",
            url: url,
            data: {"p": randPageNum.toString()},
            success: dataFetched
        });
        
        my_data = JSON.parse(localStorage.test);
        $scope.results = my_data.results;
    }
    
    // Fetched data let's look
    function dataFetched(obj){
        
        if (obj.results.length == 0) {
            console.log("No recipes found");
        }
        
        else {
            localStorage.test = JSON.stringify(obj);
        }
    }

    // Organizes selected recipes
    $scope.datePick = function(day, recipe) {

        // Add the recipe to the schedule
        for (var i = 0; i < $scope.currentList.length; i++) {
            if ($scope.currentList[i].title == day){
                $scope.currentList[i].recipes.push(recipe);
                break;
            }
        }

        var ingredientsList = recipe.ingredients.split(',');

        // Adds those ingredients to the shopping list
        for (var j = 0; j < ingredientsList.length; j++){
            var itemIndex = $scope.shoppingList.indexOf(ingredientsList[j])
            
            if ( itemIndex == -1)
                $scope.shoppingList.push(ingredientsList[j]);
        }
    }
}]);