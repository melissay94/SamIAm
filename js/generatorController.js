
mainApp.controller('generatorCtrl', ["$scope", "$http", function($scope, $http){
    
    $scope.results = []; 
    $scope.currentList = [
        {title: "Monday", recipes: [] },
        {title: "Tuesday", recipes: [] },
        {title: "Wednesday", recipes: [] },
        {title: "Thursday", recipes: [] },
        {title: "Friday", recipes: [] }];

    $scope.shoppingList = [];
    var nutriObj;
    
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
    }
    
    // Fetched data let's look
    function dataFetched(obj){
        
        if (obj.results.length == 0) {
            $scope.results = [{ title: "No recipes found at this time", ingredients: "We seem to be having issues finding our cookbook! Feel free to contact us if this continues.", img: "default-img.png"}];
        }
        
        else {
            localStorage.test = JSON.stringify(obj);        
            my_data = JSON.parse(localStorage.test);

            if (my_data.length < 1) {
                $scope.results = [
                    { title: "Mexican Fiesta Bowl", ingredients: "Chicken Breasts, White Rice, Garlic, Black Beans, Limes, Bell Peppers, Red Onions, Diced Tomatoes, Corn"},
                    { title: "American StirFry", ingredients: "Chicken Breasts or Pork Chops, White Rice, StirFry Sauce, White Onions, Bell Peppers, Broccoli, Carrots, Water Chestnuts, Baby Corn"},
                    { title: "Brazilian Okra Stew", ingredients: "Chunk Steak, White Rice, Diced Tomatoes, Okra, Garlic, White Onions"}, 
                    { title: "Mamazinha's Cheese Bread", ingredients: "Cheese bread flour, chedder jack cheese, bell peppers, ham, eggs, water"}
                ];
            } 
            else {
                $scope.$apply(function(){
                    $scope.results = my_data.results;
                
                });
            }
        }
    }


    // Organizes selected recipes
    $scope.datePick = function(day, recipe) {

        var ingredientsList = recipe.ingredients.split(',');

        // Adds those ingredients to the shopping list
        for (var j = 0; j < ingredientsList.length; j++){
            var itemIndex = $scope.shoppingList.indexOf(ingredientsList[j])

            if ( itemIndex == -1)
                $scope.shoppingList.push(ingredientsList[j]);
        }

        // Adds the recipe to the schedule
        for (var i = 0; i < $scope.currentList.length; i++) {
            if ($scope.currentList[i].title == day){
                $scope.currentList[i].recipes.push(recipe);
                break;
            }
        }

    }
    
    // Removes selected recipe
    $scope.removeRecipe = function(day, item) {
        // Takes the recipe out of the schedule
        for (var i = 0; i < $scope.currentList.length; i++) {
            if ($scope.currentList[i].title == day){
                var index = $scope.currentList[i].recipes.indexOf(item);
                $scope.currentList[i].recipes.splice(index, 1);
            }
        }
        
        // Removes ingredients from shopping list
        console.log($scope.shoppingList);
    }

}]);