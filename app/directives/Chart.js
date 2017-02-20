function Chart() {
  return {
    restrict: 'E',
    templateUrl: 'app/templates/chart.html'
  };

}

angular
  .module('app')
  .directive('chart', Chart)
