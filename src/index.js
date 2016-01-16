//
// Modules
//

let iscApp = angular.module('iscApp', ['ngRoute']);

//
// Controllers
//

import AddEmployeeController from './controllers/AddEmployeeController';
import EditEmployeeController from './controllers/EditEmployeeController'
import EmployeeBlacklistController from './controllers/EmployeeBlacklistController';
import EmployeeDetailController from './controllers/EmployeeDetailController';
import EmployeeWhitelistController from './controllers/EmployeeWhitelistController';
import HomeController from './controllers/HomeController';
import MainController from './controllers/MainController';
import PreferencesController from './controllers/MyAccount/PreferencesController';
import SeatingChartsController from './controllers/SeatingChartsController';
import TeamMembersController from './controllers/TeamMembersController';
import ViewEmployeesController from './controllers/ViewEmployeesController';

iscApp.controller('AddEmployeeController', AddEmployeeController);
iscApp.controller('EditEmployeeController', EditEmployeeController);
iscApp.controller('EmployeeBlacklistController', EmployeeBlacklistController);
iscApp.controller('EmployeeDetailController', EmployeeDetailController);
iscApp.controller('EmployeeWhitelistController', EmployeeWhitelistController);
iscApp.controller('HomeController', HomeController);
iscApp.controller('MainController', MainController);
iscApp.controller('PreferencesController', PreferencesController);
iscApp.controller('SeatingChartsController', SeatingChartsController);
iscApp.controller('TeamMembersController', TeamMembersController);
iscApp.controller('ViewEmployeesController', ViewEmployeesController);

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
  .when('/add-employee', {
    templateUrl: 'views/add-employee.html',
    controller: 'AddEmployeeController'
  })
  .when('/edit-employee/:id', {
    templateUrl: 'views/edit-employee.html',
    controller: 'EditEmployeeController'
  })
  .when('/employee-blacklist/:id', {
    templateUrl: 'views/employee-blacklist.html',
    controller: 'EmployeeBlacklistController'
  })
  .when('/employee-detail/:id', {
    templateUrl: 'views/employee-detail.html',
    controller: 'EmployeeDetailController'
  })
  .when('/employee-whitelist/:id', {
    templateUrl: 'views/employee-whitelist.html',
    controller: 'EmployeeWhitelistController'
  })
  .when('/my-account/preferences', {
    templateUrl: 'views/my-account/preferences.html',
    controller: 'PreferencesController'
  })
  .when('/seating-charts', {
    templateUrl: 'views/seating-charts.html',
    controller: 'SeatingChartsController'
  })
  .when('/team-members/:id', {
    templateUrl: 'views/team-members.html',
    controller: 'TeamMembersController'
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
