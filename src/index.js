//
// Modules
//

let iscApp = angular.module('iscApp', ['ngRoute']);

//
// Controllers
//

import MainController from './controllers/MainController';
import HomeController from './controllers/HomeController';
import TeamMembersController from './controllers/TeamMembersController';
import SeatingChartsController from './controllers/SeatingChartsController';
import PreferencesController from './controllers/MyAccount/PreferencesController';

iscApp.controller('MainController', MainController);
iscApp.controller('HomeController', HomeController);
iscApp.controller('TeamMembersController', TeamMembersController);
iscApp.controller('SeatingChartsController', SeatingChartsController);
iscApp.controller('PreferencesController', PreferencesController);

//
// Routes
//

iscApp.config(function ($routeProvider, $locationProvider) {
  // define routes
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController'
  })
  .when('/team-members', {
    templateUrl: 'views/team-members.html',
    controller: 'TeamMembersController'
  })
  .when('/seating-charts', {
    templateUrl: 'views/seating-charts.html',
    controller: 'SeatingChartsController'
  })
  .when('/my-account/preferences', {
    templateUrl: 'views/my-account/preferences.html',
    controller: 'PreferencesController'
  })
  .otherwise({
    redirectTo: '/'
  });
  // use html5 history api (no # in url)
  $locationProvider.html5Mode(true);
});
