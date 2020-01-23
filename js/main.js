"use strict";

app.controller("Main", function($scope, $http, $location, Factory) {
  $scope.OnInit = function() {
    $scope.location = $location.path();
    $http.get("/api/destination").then(
      function(response) {
        $scope.Destinations = response.data.results;
        $http.get("/api/reviews").then(
          function(response) {
            for (let index = 0; index < response.data.results.length; index++) {
              response.data.results[index].stars = [];
              for (let i = 0; i < 5; i++) {
                if (i < response.data.results[index].customer_rating) {
                  response.data.results[index].stars.push({
                    status: true
                  });
                } else {
                  response.data.results[index].stars.push({
                    status: false
                  });
                }
              }
            }
            $scope.Reviews = response.data.results;
            $http.get("/api/tours?type=T").then(
              function(response) {
                $scope.Trending = response.data.results;
                $http.get("/api/tours?type=W").then(
                  function(response) {
                    for (let i = 0; i < response.data.results.length; i++) {
                      Factory.Format(response.data.results[i]);
                    }
                    $scope.Weekend = response.data.results;
                    $http.get("/api/tours?type=H").then(
                      function(response) {
                        for (let i = 0; i < response.data.results.length; i++) {
                          Factory.Format(response.data.results[i]);
                        }
                        $scope.Honeymoon = response.data.results;
                      },
                      function(response) {
                        alert(response.data);
                      }
                    );
                  },
                  function(response) {
                    alert(response.data);
                  }
                );
              },
              function(response) {
                alert(response.data);
              }
            );
          },
          function(response) {
            alert(response.data);
          }
        );
      },
      function(response) {
        alert(response.data);
      }
    );

    $scope.closeContact = function() {
      document.querySelector(".side-contact").style.display = "none";
    };

    $scope.ScrollTop = function() {
      $("html, body").animate({ scrollTop: 0 }, 400);
    };

    $scope.Subscribe = Factory.Subscribe;

    $scope.Filters = function() {
      Factory.date = document.querySelector("#departure_date").value;
      Factory.map = document.querySelector("#destination").value;
      if (Factory.map !== "" || Factory.date !== "") {
        $location.path("/tours");
      }
    };
  };
});
