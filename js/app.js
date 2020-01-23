"use strict";

var app = angular.module("trugo", ["ngRoute"]);

app.config(function($routeProvider , $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/trugo/pages/home.html",
      controller: "Main"
    })
    .when("/tours", {
      templateUrl: "/trugo/pages/tours.html",
      controller: "Tours"
    })
    .when("/destination/:category", {
      templateUrl: "/trugo/pages/destination.html",
      controller: "Destination"
    })
    .when("/destinations", {
      templateUrl: "/trugo/pages/destinations.html",
      controller: "Destinations"
    })
    .when("/itinerary/:no", {
      templateUrl: "/trugo/pages/itinerary.html",
      controller: "Itinerary"
    })
    .otherwise({
      templateUrl: "/trugo/pages/404.html",
      controller: "404"
    });
    $locationProvider.html5Mode(true);
});