angular
  .module('app', ['ui.router'])
  .config(function($stateProvider) {
      $stateProvider
        .state('home', {
          url: '',
          templateUrl: 'app/templates/home.html',
          controller: 'HomeController'
        });
  });
