"use strict";

app.controller("Itinerary", function($scope,$http,$routeParams,$location,Factory) {
  $scope.OnInit = function() {
    $scope.ShowOverlay();
    $http.get("/api/itinerary?t=" + $routeParams.no).then(
      function(response) {
        if(response.data !== "") {
          response.data;
          response.data.facilities = JSON.parse(response.data.facilities);
          response.data.tourist_attractions = JSON.parse(response.data.tourist_attractions);
          for(var i = 0; i < response.data.tourist_attractions.length ; i++){
            if (!response.data.tourist_attractions[i].image_name.includes(response.data.package_no)) {
            response.data.tourist_attractions[i].image_name = response.data.package_no + "_" + response.data.tourist_attractions[i].image_name;
            }
          }
          response.data.itinerary = JSON.parse(response.data.itinerary);
          response.data.carousel = JSON.parse(response.data.carousel);
          response.data.carousel.push({image_name :  response.data.package_image_name});
          for(var i = 0; i < response.data.carousel.length ; i++) {
            if (!response.data.carousel[i].image_name.includes(response.data.package_no)) {
            response.data.carousel[i].image_name = response.data.package_no + "_" + response.data.carousel[i].image_name;
            }
          }
          Factory.Format(response.data);
          $scope.Model = response.data;
          document.querySelector(".content").classList.remove("content");
          $scope.HideOverlay();
        } else {
          $location.path("/");
        }
      },
      function() {
        $location.path("/");
      }
    );
  };

  $(".accordion-box").on('click', '.acc-btn', function () {
    var outerBox = $(this).parents('.accordion-box');
    var target = $(this).parents('.accordion');
    if ($(this).hasClass('active') !== true) {
      $(outerBox).find('.accordion .acc-btn').removeClass('active');
    }
    if ($(this).next('.acc-content').is(':visible')) {
      return false;
    } else {
      $(this).addClass('active');
      $(outerBox).children('.accordion').removeClass('active-block');
      $(outerBox).find('.accordion').children('.acc-content').slideUp(300);
      target.addClass('active-block');
      $(this).next('.acc-content').slideDown(300);
    }
  });

  $scope.Zoom = function() {
    let data = this.data;
    document.querySelector("#img-content").innerHTML = `<img src="../admin/content/${data.image_name}"></img>`;
    document.querySelector("#content").innerHTML = `<p>${data.title}</p>`;
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
