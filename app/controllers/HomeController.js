function HomeController($scope, CurrentWeather, GetForecast, CreateChart) {
  var ctrl = this;
  $scope.searchTerm = '';

  $scope.searchWeather = function() {
    CurrentWeather
      .searchCity($scope.searchTerm)
      .then(function(res) {
        $scope.cityName = res.data.name;
        $scope.currentWeatherDescription = res.data.weather[0].main;
        $scope.currentTemperature = res.data.main.temp;
        $scope.icon = "http://openweathermap.org/img/w/" + res.data.weather[0].icon + ".png";
      })
      .catch(function() {
        console.log("NOT WORKING!");
      });

      GetForecast
        .searchResults($scope.searchTerm)
        .then(function(res) {
          var dataset = res.data.list;
          var allData = [];
          for (var i = 0; i < dataset.length; i++) {
            allData.push([dataset[i].temp.min, dataset[i].temp.max, dataset[i].weather[0].main ])
          }
          CreateChart.appendToDom(allData);
        })
        .catch(function() {
          console.log("Second NOT WORKING!");
        })

  }

}

angular
  .module('app')
  .controller('HomeController', HomeController)
