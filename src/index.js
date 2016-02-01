//
// Modules
//
var angular = require('angular');
var angularDragula = require('angular-dragula');
let iscApp = angular.module('iscApp', ['ngRoute', angularDragula(angular)]);

//
// Controllers
//

import AddEmployeeController from './controllers/AddEmployeeController';
import AddOfficeController from './controllers/AddOfficeController';
import EditEmployeeController from './controllers/EditEmployeeController'
import EditOfficeController from './controllers/EditOfficeController'
import EmployeeBlacklistController from './controllers/EmployeeBlacklistController';
import EmployeeCoworkersController from './controllers/EmployeeCoworkersController';
import EmployeeDetailController from './controllers/EmployeeDetailController';
import EmployeePreferencesController from './controllers/MyAccount/EmployeePreferencesController';
import EmployeeWhitelistController from './controllers/EmployeeWhitelistController';
import FloorplanController from './controllers/FloorplanController';
import HomeController from './controllers/HomeController';
import MainController from './controllers/MainController';
import OfficesController from './controllers/OfficesController';
import OfficeDetailController from './controllers/OfficeDetailController';
import OfficeEmployeesController from './controllers/OfficeEmployeesController';
import SeatingChartsController from './controllers/SeatingChartsController';
import TeamMembersController from './controllers/TeamMembersController';
import ViewEmployeesController from './controllers/ViewEmployeesController';

iscApp.controller('AddEmployeeController', AddEmployeeController);
iscApp.controller('AddOfficeController', AddOfficeController);
iscApp.controller('EditEmployeeController', EditEmployeeController);
iscApp.controller('EditOfficeController', EditOfficeController);
iscApp.controller('EmployeeBlacklistController', EmployeeBlacklistController);
iscApp.controller('EmployeeCoworkersController', EmployeeCoworkersController);
iscApp.controller('EmployeeDetailController', EmployeeDetailController);
iscApp.controller('EmployeePreferencesController', EmployeePreferencesController);
iscApp.controller('EmployeeWhitelistController', EmployeeWhitelistController);
iscApp.controller('FloorplanController', FloorplanController);
iscApp.controller('HomeController', HomeController);
iscApp.controller('MainController', MainController);
iscApp.controller('OfficesController', OfficesController);
iscApp.controller('OfficeDetailController', OfficeDetailController);
iscApp.controller('OfficeEmployeesController', OfficeEmployeesController);
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
  .when('/add-office', {
    templateUrl: 'views/add-office.html',
    controller: 'AddOfficeController'
  })
  .when('/edit-employee/:id', {
    templateUrl: 'views/edit-employee.html',
    controller: 'EditEmployeeController'
  })
  .when('/edit-office/:id', {
    templateUrl: 'views/edit-office.html',
    controller: 'EditOfficeController'
  })
  .when('/employee-blacklist/:id', {
    templateUrl: 'views/employee-blacklist.html',
    controller: 'EmployeeBlacklistController'
  })
  .when('/employee-coworkers/:employeeID/:officeID', {
    templateUrl: 'views/employee-coworkers.html',
    controller: 'EmployeeCoworkersController'
  })
  .when('/employee-detail/:id', {
    templateUrl: 'views/employee-detail.html',
    controller: 'EmployeeDetailController'
  })
  .when('/employee-preferences/:id', {
    templateUrl: 'views/my-account/employee-preferences.html',
    controller: 'EmployeePreferencesController'
  })
  .when('/employee-whitelist/:id', {
    templateUrl: 'views/employee-whitelist.html',
    controller: 'EmployeeWhitelistController'
  })
  .when('/floorplan/:id', {
    templateUrl: 'views/floorplan.html',
    controller: 'FloorplanController'
  })
  .when('/offices', {
    templateUrl: 'views/offices.html',
    controller: 'OfficesController'
  })
  .when('/office-detail/:id', {
    templateUrl: 'views/office-detail.html',
    controller: 'OfficeDetailController'
  })
  .when('/office-employees/:id', {
    templateUrl: 'views/office-employees.html',
    controller: 'OfficeEmployeesController'
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
