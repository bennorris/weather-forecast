function GetForecast($http) {
  var appKey = '03069a45a0dba86bcde625429a0468ad';

  this.searchResults = function(zipcode) {
    return $http.get(`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipcode}&units=imperial&APPID=${appKey}`);
  }


}


angular
  .module('app')
  .service('GetForecast', GetForecast)
