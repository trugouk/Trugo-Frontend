"use strict";

app.controller("Destinations", function($scope,$http,$location,Factory) {
  $scope.OnInit = function() {
    $scope.location = $location.path();
    $http.get("/api/destination?d=all").then(
      function(response) {
        $scope.Destinations = response.data.results;
      },
      function(response) {
        alert(response.data);
      }
    );
  };

  $scope.Subscribe = Factory.Subscribe;

  $scope.ScrollTop = function() {
    $("html, body").animate({ scrollTop: 0 }, 400);
  };
});
