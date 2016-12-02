
    var results;

mainApp.controller('generatorCtrl', ["$scope", function($scope){
    
    $scope.ingredients = [];
    
    $scope.getData = function() {
        // Build up search query. For now, just do it with a random number and not the specifics 
        var url = "http://www.recipepuppy.com/api/?";
        var randPageNum = Math.floor(Math.random() * 100 + 1);

        url += "p=" + randPageNum.toString();
        console.log("results: " + url);

        // Call the service and download the results
        $.getJSON('https://crossorigin.me/http://www.recipepuppy.com/api/', function(data){
            dataFetched(data);
        });
    }
    
    // Fetched data let's look
    function dataFetched(obj){
        console.log("What we got: ", obj.results);

        if (obj.results.length == 0) {
            var status = "No recipes found";
        }
        
        else {
            results = obj.results;
        }
    }
}]);

mainApp.factory('Results', function($filter) {
   return results; 
});