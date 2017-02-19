function Chart() {
  return {
    templateUrl: 'app/templates/chart.html'
  };

}

angular
  .module('app')
  .directive('chart', Chart)
