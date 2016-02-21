//
// Modules
//
var angular = require('angular');
var angularDragula = require('angular-dragula');
let iscApp = angular.module('iscApp', ['ngRoute', angularDragula(angular), 'ngFileUpload']);

//
// Controllers
//

import AddCompanyController from './controllers/AddCompanyController';
import AddEmployeeCoworkersController from './controllers/AddEmployeeCoworkersController';
import AddEmployeeIndividualInfoController from './controllers/AddEmployeeIndividualInfoController';
import AddEmployeePreferencesController from './controllers/AddEmployeePreferencesController';
import AddOfficeController from './controllers/AddOfficeController';
import AddInitialCompanyController from './controllers/StartUp/AddInitialCompanyController';
import AddInitialOfficeController from './controllers/StartUp/AddInitialOfficeController';
import AddInitialTemperatureRangeController from './controllers/StartUp/AddInitialTemperatureRangeController';
import AddOfficeEmployeeController from './controllers/AddOfficeEmployeeController';
import AddTemperatureRangeController from './controllers/AddTemperatureRangeController';
import AddSuperAdminToOfficeController from './controllers/StartUp/AddSuperAdminToOfficeController';
import CompaniesController from './controllers/CompaniesController';
import CompanyOfficesController from './controllers/CompanyOfficesController';
import EditCompanyController from './controllers/EditCompanyController';
import EditEmployeeController from './controllers/EditEmployeeController';
import EditOfficeController from './controllers/EditOfficeController';
import EditTemperatureRangeController from './controllers/EditTemperatureRangeController';
import EmployeeBlacklistController from './controllers/EmployeeBlacklistController';
import EmployeeCoworkersController from './controllers/EmployeeCoworkersController';
import EmployeeDetailController from './controllers/EmployeeDetailController';
import EmployeePreferencesController from './controllers/EmployeePreferencesController';
import EmployeeWhitelistController from './controllers/EmployeeWhitelistController';
import FloorplanController from './controllers/FloorplanController';
import InitializationErrorController from './controllers/Errors/InitializationErrorController';
import LoginController from './controllers/LoginController';
import MainController from './controllers/MainController';
import MyInfoController from './controllers/MyAccount/MyInfoController';
import OfficesController from './controllers/OfficesController';
import OfficeDetailController from './controllers/OfficeDetailController';
import OfficeEmployeesController from './controllers/OfficeEmployeesController';
import SeatingChartsController from './controllers/SeatingChartsController';
import SignOutController from './controllers/MyAccount/SignOutController';
import TeamMembersController from './controllers/TeamMembersController';
import TemperatureRangesController from './controllers/TemperatureRangesController';
import ViewEmployeesController from './controllers/ViewEmployeesController';

iscApp.controller('AddCompanyController', AddCompanyController);
iscApp.controller('AddEmployeeCoworkersController', AddEmployeeCoworkersController);
iscApp.controller('AddEmployeeIndividualInfoController', AddEmployeeIndividualInfoController);
iscApp.controller('AddEmployeePreferencesController', AddEmployeePreferencesController);
iscApp.controller('AddInitialCompanyController', AddInitialCompanyController);
iscApp.controller('AddInitialOfficeController', AddInitialOfficeController);
iscApp.controller('AddInitialTemperatureRangeController', AddInitialTemperatureRangeController);
iscApp.controller('AddSuperAdminToOfficeController', AddSuperAdminToOfficeController);
iscApp.controller('AddOfficeController', AddOfficeController);
iscApp.controller('AddOfficeEmployeeController', AddOfficeEmployeeController);
iscApp.controller('AddTemperatureRangeController', AddTemperatureRangeController);
iscApp.controller('CompaniesController', CompaniesController);
iscApp.controller('CompanyOfficesController', CompanyOfficesController);
iscApp.controller('EditCompanyController', EditCompanyController);
iscApp.controller('EditEmployeeController', EditEmployeeController);
iscApp.controller('EditOfficeController', EditOfficeController);
iscApp.controller('EditTemperatureRangeController', EditTemperatureRangeController);
iscApp.controller('EmployeeBlacklistController', EmployeeBlacklistController);
iscApp.controller('EmployeeCoworkersController', EmployeeCoworkersController);
iscApp.controller('EmployeeDetailController', EmployeeDetailController);
iscApp.controller('EmployeePreferencesController', EmployeePreferencesController);
iscApp.controller('EmployeeWhitelistController', EmployeeWhitelistController);
iscApp.controller('FloorplanController', FloorplanController);
iscApp.controller('InitializationErrorController', InitializationErrorController);
iscApp.controller('LoginController', LoginController);
iscApp.controller('MainController', MainController);
iscApp.controller('MyInfoController', MyInfoController);
iscApp.controller('OfficesController', OfficesController);
iscApp.controller('OfficeDetailController', OfficeDetailController);
iscApp.controller('OfficeEmployeesController', OfficeEmployeesController);
iscApp.controller('SeatingChartsController', SeatingChartsController);
iscApp.controller('SignOutController', SignOutController);
iscApp.controller('TeamMembersController', TeamMembersController);
iscApp.controller('TemperatureRangesController', TemperatureRangesController);
iscApp.controller('ViewEmployeesController', ViewEmployeesController);

//
// Routes
//

iscApp.config(function ($routeProvider, $locationProvider) {
  // define routes
  $routeProvider
  .when('/add-company', {
    templateUrl: 'views/add-company.html',
    controller: 'AddCompanyController'
  })
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
  .when('/add-initial-company', {
    templateUrl: 'views/start-up/add-initial-company.html',
    controller: 'AddInitialCompanyController'
  })
  .when('/add-initial-office/:id', {
    templateUrl: 'views/start-up/add-initial-office.html',
    controller: 'AddInitialOfficeController'
  })
  .when('/add-initial-temperature-range', {
    templateUrl: 'views/start-up/add-initial-temperature-range.html',
    controller: 'AddInitialTemperatureRangeController'
  })
  .when('/add-office', {
    templateUrl: 'views/add-office.html',
    controller: 'AddOfficeController'
  })
  .when('/add-office-employee/:id', {
    templateUrl: 'views/add-office-employee.html',
    controller: 'AddOfficeEmployeeController'
  })
  .when('/add-superadmin-to-office', {
    templateUrl: 'views/start-up/add-superadmin-to-office.html',
    controller: 'AddSuperAdminToOfficeController'
  })
  .when('/add-temperature-range', {
    templateUrl: 'views/add-temperature-range.html',
    controller: 'AddTemperatureRangeController'
  })
  .when('/companies', {
    templateUrl: 'views/companies.html',
    controller: 'CompaniesController'
  })
  .when('/company-offices/:id', {
    templateUrl: 'views/company-offices.html',
    controller: 'CompanyOfficesController'
  })
  .when('/edit-company/:id', {
    templateUrl: 'views/edit-company.html',
    controller: 'EditCompanyController'
  })
  .when('/edit-employee/:id', {
    templateUrl: 'views/edit-employee.html',
    controller: 'EditEmployeeController'
  })
  .when('/edit-office/:id', {
    templateUrl: 'views/edit-office.html',
    controller: 'EditOfficeController'
  })
  .when('/edit-temperature-range/:id', {
    templateUrl: 'views/edit-temperature-range.html',
    controller: 'EditTemperatureRangeController'
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
  .when('/initialization-error', {
    templateUrl: 'views/errors/initialization-error.html',
    controller: 'InitializationErrorController'
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
    templateUrl: 'views/my-account/sign-out.html',
    controller: 'SignOutController'
  })
  .when('/team-members/:id', {
    templateUrl: 'views/team-members.html',
    controller: 'TeamMembersController'
  })
  .when('/temperature-ranges', {
    templateUrl: 'views/temperature-ranges.html',
    controller: 'TemperatureRangesController'
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
// Services
//

// Service for storing employee data for adding
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
