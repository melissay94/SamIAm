
mainApp.controller('generatorCtrl', ["$scope", "$http", function($scope, $http){
    
    $scope.results = [];
    
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
        $scope.results = my_data.results;
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
}]);