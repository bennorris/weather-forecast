function CurrentWeather($http) {
  var appKey = '03069a45a0dba86bcde625429a0468ad';

  this.searchCity = function(cityName) {
    return $http.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=${appKey}`);
  }


}

angular
  .module('app')
  .service('CurrentWeather', CurrentWeather)
