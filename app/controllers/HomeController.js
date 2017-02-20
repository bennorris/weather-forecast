function HomeController($scope, CurrentWeather, GetForecast, CreateChart) {

  $scope.$on('$viewContentLoaded', function() {
    $scope.searchTerm = '10025';
    $scope.searchWeather();
  })

  $scope.searchTerm = '';
  $scope.infoHidden = true;
  $scope.buttonText = "More Info"
  var buttonToggle = false;

  $scope.searchWeather = function() {
    var oldChart = angular.element(document).find('chart');
    oldChart.empty();
    CurrentWeather
      .searchCity($scope.searchTerm)
      .then(function(res) {
        $scope.cityName = res.data.name;
        $scope.currentWeatherDescription = res.data.weather[0].main;
        $scope.currentTemperature = Math.round(res.data.main.temp);
        $scope.icon = "http://openweathermap.org/img/w/" + res.data.weather[0].icon + ".png";
        $scope.windspeed = res.data.wind.speed;
        $scope.humidity = res.data.main.humidity;
        $scope.pressure = res.data.main.pressure;
        $scope.sunrise = res.data.sys.sunrise;
        $scope.sunset = res.data.sys.sunset;
      })
      .catch(function() {
        $scope.errorText = ("Sorry, it seems there's a problem. Please try again.");
      });

      GetForecast
        .searchResults($scope.searchTerm)
        .then(function(res) {
          $scope.todayHigh = Math.round(res.data.list[0].temp.max);
          $scope.todayLow = Math.round(res.data.list[0].temp.min);
          var dataset = res.data.list;
          var allData = [];
          for (var i = 0; i < dataset.length; i++) {
            allData.push([dataset[i].temp.min, dataset[i].temp.max, dataset[i].weather[0].main ])
          }
          CreateChart.appendToDom(allData);
        })
        .catch(function() {
          $scope.errorText = "Sorry, it seems there's a problem. Please try again.";
        })
        $scope.searchTerm = '';
  }

    $scope.showInfo = function() {
      if (buttonToggle === false) {
      $scope.infoHidden = false;
      $scope.buttonText = "Less info";
      buttonToggle = !buttonToggle;
    } else {
      $scope.infoHidden = true;
      $scope.buttonText = "More info";
      buttonToggle = !buttonToggle;
    }
  }


}

angular
  .module('app')
  .controller('HomeController', HomeController)
