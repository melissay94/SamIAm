
mainApp.controller('generatorCtrl', ["$scope", function($scope){
    
    $scope.results = [];
    
    $scope.getData = function() {
        // Build up search query. For now, just do it with a random number and not the specifics 
        var my_data;
        var url = "http://www.recipepuppy.com/api/?";
        var randPageNum = Math.floor(Math.random() * 100 + 1);

        url += "p=" + randPageNum.toString();
        console.log("results: " + url);

        // Call the service and download the results
        $.getJSON('http://www.recipepuppy.com/api/', function(data){
            my_data = dataFetched(data);
            console.log("Inside: " , my_data);
            
        });
        console.log(my_data);
        $scope.results.push({title: "Example 2", ingredients: "example 2"});
    }
    
    // Fetched data let's look
    function dataFetched(obj){

        if (obj.results.length == 0) {
            var status = "No recipes found";
        }
        
        else {
            return obj.results;
        }
    }
}]);