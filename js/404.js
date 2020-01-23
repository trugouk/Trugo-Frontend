"use strict";

app.controller("404", function($scope, $location) {
  $scope.Error404 = function() {
    $location.path("/");
  };
});
