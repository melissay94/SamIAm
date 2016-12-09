
mainApp.controller('generatorCtrl', ["$scope", "$http", function($scope, $http){
    
    $scope.results = []; 
    $scope.currentList = ["Nothing chosen", "Nothing chosen", "Nothing chosen", "Nothing chosen", "Nothing chosen"];
    
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

        //$http.get("http://www.recipepuppy.com/api/?p=47").then(dataFetched);
        
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
    
    $scope.datePick = function(day, recipe) {
        console.log("Day: ", day, " Recipe: ", recipe);
    }
}]);