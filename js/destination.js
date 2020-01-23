"use strict";

app.controller("Destination", function($scope,$http,$routeParams,Factory) {
  $scope.DomString = function(data) {
    document.querySelector(".related_tours").insertAdjacentHTML(
      "beforeend",
      `<div class="card">
          <a href="../trugo/itinerary/${data.package_no}" target="_blank">
              <img class="card-img-top" src="../admin/content/${
                data.package_no
              }_${data.package_image_name}">
          </a>
          <div class="discount ${data.discount > 0 ? "" : "discount-hide"}">
              <span>${data.discount}%</span>
          </div>
          <div class="ribbon mt-3">₹${data.discount_budget !== "0"
              ? parseInt(data.discount_budget).toLocaleString("en-IN")
              : parseInt(data.actual_budget).toLocaleString("en-IN")
          }</div>
          <a href="../trugo/itinerary/${data.package_no}" target="_blank">
              <div class="tours-body">
                  <p class="map"><i class="fa fa-map-marker"></i> ${data.destination}</p>
                  <h4 class="package">${data.package_name}</h4>
              </div>
          </a>
        </div>`
    );
  };

  $scope.OnInit = function() {
      $http.get("/api/filters?tag=&duration=&budget=&starting_city=&ending_city=&destination=" +
          $routeParams.category + "&departure_date="
        ).then(
          function(response) {
            $scope.RelatedToursLength = response.data.results.length;
            if ($scope.RelatedToursLength !== 0) {
              let RelatedTours = response.data.results;
              for (let index = 0; index < RelatedTours.length; index++) {
                $scope.DomString(RelatedTours[index]);
              }
              $(".related_tours").slick({
                prevArrow: $(".owl-prev"),
                nextArrow: $(".owl-next"),
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                dots: false,
                infinite: true,
                responsive: [
                  {
                    breakpoint: 1000,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1
                    }
                  },
                  {
                    breakpoint: 800,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
                ]
              });
            }
            // $http.get("/api/destination?d=" + $routeParams.category).then(
            //   function(response) {
            //     document.querySelector(".destination_content").innerHTML = response.data.results[0].detail;
            //   },
            //   function(response) {
            //     alert(response.data);
            //   }
            // );
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
