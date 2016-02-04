//
// Modules
//
var angular = require('angular');
var angularDragula = require('angular-dragula');
let iscApp = angular.module('iscApp', ['ngRoute', angularDragula(angular)]);

//
// Controllers
//

import AddEmployeeCoworkersController from './controllers/AddEmployeeCoworkersController';
import AddEmployeeIndividualInfoController from './controllers/AddEmployeeIndividualInfoController';
import AddEmployeePreferencesController from './controllers/AddEmployeePreferencesController';
import AddOfficeController from './controllers/AddOfficeController';
import EditEmployeeController from './controllers/EditEmployeeController'
import EditOfficeController from './controllers/EditOfficeController'
import EmployeeBlacklistController from './controllers/EmployeeBlacklistController';
import EmployeeCoworkersController from './controllers/EmployeeCoworkersController';
import EmployeeDetailController from './controllers/EmployeeDetailController';
import EmployeePreferencesController from './controllers/EmployeePreferencesController';
import EmployeeWhitelistController from './controllers/EmployeeWhitelistController';
import FloorplanController from './controllers/FloorplanController';
import LoginController from './controllers/LoginController';
import MainController from './controllers/MainController';
import MyInfoController from './controllers/MyAccount/MyInfoController';
import OfficesController from './controllers/OfficesController';
import OfficeDetailController from './controllers/OfficeDetailController';
import OfficeEmployeesController from './controllers/OfficeEmployeesController';
import SeatingChartsController from './controllers/SeatingChartsController';
import SignOutController from './controllers/SignOutController';
import TeamMembersController from './controllers/TeamMembersController';
import ViewEmployeesController from './controllers/ViewEmployeesController';

iscApp.controller('AddEmployeeCoworkersController', AddEmployeeCoworkersController);
iscApp.controller('AddEmployeeIndividualInfoController', AddEmployeeIndividualInfoController);
iscApp.controller('AddEmployeePreferencesController', AddEmployeePreferencesController);
iscApp.controller('AddOfficeController', AddOfficeController);
iscApp.controller('EditEmployeeController', EditEmployeeController);
iscApp.controller('EditOfficeController', EditOfficeController);
iscApp.controller('EmployeeBlacklistController', EmployeeBlacklistController);
iscApp.controller('EmployeeCoworkersController', EmployeeCoworkersController);
iscApp.controller('EmployeeDetailController', EmployeeDetailController);
iscApp.controller('EmployeePreferencesController', EmployeePreferencesController);
iscApp.controller('EmployeeWhitelistController', EmployeeWhitelistController);
iscApp.controller('FloorplanController', FloorplanController);
iscApp.controller('LoginController', LoginController);
iscApp.controller('MainController', MainController);
iscApp.controller('MyInfoController', MyInfoController);
iscApp.controller('OfficesController', OfficesController);
iscApp.controller('OfficeDetailController', OfficeDetailController);
iscApp.controller('OfficeEmployeesController', OfficeEmployeesController);
iscApp.controller('SeatingChartsController', SeatingChartsController);
iscApp.controller('SignOutController', SignOutController);
iscApp.controller('TeamMembersController', TeamMembersController);
iscApp.controller('ViewEmployeesController', ViewEmployeesController);

//
// Routes
//

iscApp.config(function ($routeProvider, $locationProvider) {
  // define routes
  $routeProvider
  .when('/add-employee', {
    templateUrl: 'views/add-employee-individual-info.html',
    controller: 'AddEmployeeIndividualInfoController'
  })
  .when('/add-employee-coworkers', {
    templateUrl: 'views/add-employee-coworkers.html',
    controller: 'AddEmployeeCoworkersController'
  })
  .when('/add-employee-preferences', {
    templateUrl: 'views/add-employee-preferences.html',
    controller: 'AddEmployeePreferencesController'
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
    templateUrl: 'views/employee-preferences.html',
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
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController'
  })
  .when('/my-info', {
    templateUrl: 'views/my-account/my-info.html',
    controller: 'MyInfoController'
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
  .when('/sign-out', {
    templateUrl: 'views/sign-out.html',
    controller: 'SignOutController'
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
    redirectTo: '/login'
  });
  // use html5 history api (no # in url)
  $locationProvider.html5Mode(true);
});

//
// Service
//
iscApp.factory('addService', function() {
  var savedData = {}
  function set(data) {
    savedData = data;
  }
  function get() {
    return savedData;
  }
  return {
    set: set,  get: get
  }
});
