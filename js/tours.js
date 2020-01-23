"use strict";

app.controller("Tours", function($scope,$http,Factory) {
  $scope.tags = [
    { tag: "Adventure" },
    { tag: "Beach" },
    { tag: "Trekking" },
    { tag: "Cruise" },
    { tag: "Honeymoon" },
    { tag: "Family" }
  ];
  $scope.msg = "";
  let duration = "";
  let budget = "";
  let destination = "";
  let starting_city = "";
  let ending_city = "";
  let departure_date = "";
  let url = "";
  let tags = [];

  if (!localStorage.getItem("tags")) {
    localStorage.setItem("tags", JSON.stringify($scope.tags));
  }

  $scope.OnInit = function() {
    $scope.ShowOverlay();

    var slider_budget = document.getElementById("budget-range");
    var output_budget = document.getElementById("budget-value");
    output_budget.innerHTML = "₹" + slider_budget.value;
    slider_budget.oninput = function () {
      output_budget.innerHTML = "₹" + this.value;
    }
    var slider_duration = document.getElementById("duration-range");
    var output_duration = document.getElementById("duration-value");
    output_duration.innerHTML = slider_duration.value + " " + "Days";
    slider_duration.oninput = function () {
      output_duration.innerHTML = this.value + " " + "Days";
    }

    $http.get("/api/destination?d=all").then(
      function(response) {
        document.querySelector(".tour-content").classList.remove("tour-content");
        $scope.DestinationModel = response.data.results;
      },
      function() {}
    );
    // get destination and date from url
    document.querySelector("#destination").value = Factory.map ? Factory.map : "";
    destination = Factory.map ? Factory.map : "";
    document.querySelector("#departure_date").value = Factory.date ? Factory.date : "";
    departure_date = Factory.date ? Factory.date : "";
    if(destination !== "" || departure_date !== ""){
      $scope.ApplyFilters(); 
    }else {
      $scope.getPopularTours();
    }
  };

  $scope.Url = function() {
    url = "?tag=";
    if (tags.length > 0) {
      for (let i = 0; i < tags.length; i++) {
        if (i > 0) {
          url += ",";
        }
        url += tags[i];
      }
    } else {
      url += "";
    }
    url += "&duration=" + duration;
    url += "&budget=" + budget;
    url += "&starting_city=" + starting_city;
    url += "&ending_city=" + ending_city;
    url += "&destination=" + destination;
    url += "&departure_date=" + departure_date;
    return url;
  };

  $scope.TopFilter = function() {
    destination = document.querySelector("#destination").value;
    starting_city = document.querySelector("#starting_city").value;
    ending_city = document.querySelector("#ending_city").value;
    departure_date = document.querySelector("#departure_date").value;
    $scope.ApplyFilters();
  };

  $scope.TagsChange = function(name, isChecked) {
    if (isChecked) {
      tags.push(name);
    } else tags.splice(tags.indexOf(name), 1);
    $scope.ApplyFilters();
  };

  $scope.BudgetFilter = function() {
    budget = document.querySelector("#budget-range").value;
    $scope.ApplyFilters();
  };

  $scope.DurationFilter = function() {
    duration = document.querySelector("#duration-range").value;
    $scope.ApplyFilters();
  };

  $scope.ApplyFilters = function() {
    if (
      tags.length !== 0 ||
      duration !== "" ||
      budget !== "" ||
      destination !== "" ||
      starting_city !== "" ||
      ending_city !== "" ||
      departure_date !== ""
    ) {
      $scope.ShowOverlay();
      $http
        .get("/api/filters" + $scope.Url())
        .then(
          function(response) {
            $scope.msg = response.data[0];
            for (let i = 0; i < response.data.results.length; i++) {
              Factory.Format(response.data.results[i]);
            }
            $scope.ReadModel = response.data.results;
            $scope.HideOverlay();
          },
          function(response) {
            $scope.HideOverlay();
            alert(response.data);
          }
        );
    } else {
      $scope.ShowOverlay();
      $scope.getPopularTours();
    }
  };

  $scope.ClearFilters = function() {
    $scope.ShowOverlay();
    document.querySelector("#budget-range").value = 100;
    document.getElementById("budget-value").innerHTML = "₹100";
    document.querySelector("#duration-range").value = 2;
    document.getElementById("duration-value").innerHTML = "2 Days";
    document.querySelector("#destination").value = "";
    document.querySelector("#starting_city").value = "";
    document.querySelector("#ending_city").value = "";
    document.querySelector("#departure_date").value = "";
    $scope.tags = JSON.parse(localStorage.getItem("tags"));
    tags = [];
    duration = "";
    budget = "";
    destination = "";
    starting_city = "";
    ending_city = "";
    departure_date = "";
    $scope.getPopularTours();
  };

  $scope.getPopularTours = function() {
    $http.get("/api/popular").then(
      function(response) {
        $scope.msg = "";
        for (let i = 0; i < response.data.results.length; i++) {
          Factory.Format(response.data.results[i]);
        }
        $scope.ReadModel = response.data.results;
        $scope.HideOverlay();
      },
      function(response) {
        $scope.HideOverlay();
        alert(response.data);
      }
    );
  };

  $scope.ScrollTop = function() {
    $("html, body").animate({ scrollTop: 0 }, 400);
  };

  $scope.ShowOverlay = function() {
    document.querySelector(".overlay").classList.remove("notvisible");
    document.querySelector(".overlay").classList.add("visible");
  };

  $scope.HideOverlay = function() {
    document.querySelector(".overlay").classList.remove("visible");
    document.querySelector(".overlay").classList.add("notvisible");
  };
});
