//
// Modules
//

let iscApp = angular.module('iscApp', ['ngRoute', 'ngTagsInput', 'ui.bootstrap']);

//
// Controllers
//

import MainController from './controllers/MainController';
import HomeController from './controllers/HomeController';
import TeamMembersController from './controllers/TeamMembersController';
import SeatingChartsController from './controllers/SeatingChartsController';
import PreferencesController from './controllers/MyAccount/PreferencesController';
import AddEmployeeController from './controllers/AddEmployeeController';
import ViewEmployeesController from './controllers/ViewEmployeesController';

iscApp.controller('MainController', MainController);
iscApp.controller('HomeController', HomeController);
iscApp.controller('TeamMembersController', TeamMembersController);
iscApp.controller('SeatingChartsController', SeatingChartsController);
iscApp.controller('ViewEmployeesController', ViewEmployeesController);
iscApp.controller('PreferencesController', PreferencesController);
iscApp.controller('AddEmployeeController', AddEmployeeController);

//
// Directives
//

iscApp.directive('navbar', function() {
  return {
    templateUrl: 'views/navbar.html'
  }
});

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
  .when('/add-employee', {
    templateUrl: 'views/add-employee.html',
    controller: 'AddEmployeeController'
  })
  .when('/view-employees', {
    templateUrl: 'views/view-employees.html',
    controller: 'ViewEmployeesController'
  })
  .otherwise({
    redirectTo: '/'
  });
  // use html5 history api (no # in url)
  $locationProvider.html5Mode(true);
});
