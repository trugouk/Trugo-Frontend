"use strict";

app.factory("Factory", function($http) {
  var factory = {
    date: "",
    map: ""
  };
  factory.Format = function(data) {
    data.actual_budget = parseInt(data.actual_budget).toLocaleString("en-IN");
    data.discount_budget = parseInt(data.discount_budget).toLocaleString("en-IN");
    if(data.budget_per_day){
      data.budget_per_day = parseInt(data.budget_per_day).toLocaleString("en-IN");
    }
    if(data.package_info){
      data.package_info = unescape(data.package_info);
      data.package_info = data.package_info.split(". ");
    }
    var departure_date = new Date(data.departure_date);
    var month = departure_date.toLocaleString("en-us", { month: "long" });
    data.departure_date = departure_date.getDate() + " " + month + " " + departure_date.getFullYear();
    return data;
  };
  factory.Subscribe = function() {
    if( $("#subscribe").val() !== undefined){
      return $http.post("/api/subscribe", {
        email: $("#subscribe").val()
      }).then(
        function(success) {
          document.querySelector(".msg").innerHTML = success.data;
          document.querySelector(".msg").classList.add("success_msg");
          document.querySelector("#subscribe").value = "";
        },
        function(error) {
          document.querySelector(".msg").innerHTML = error.data;
          document.querySelector(".msg").classList.add("error_msg");
        }
      );
    }
  };
  return factory;
});
