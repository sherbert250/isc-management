//
// Modules
//
var angular = require('angular');
var angularDragula = require('angular-dragula');
let iscApp = angular.module('iscApp', ['ngRoute', angularDragula(angular), 'ngFileUpload']);

//
// Controllers
//
import AddAdminController from './controllers/AddAdminController';
import AddAdminToCompanyController from './controllers/AddAdminToCompanyController';
import AddAdminToOfficeController from './controllers/AddAdminToOfficeController';
import AddCompanyController from './controllers/AddCompanyController';
import AddEmployeeNewController from './controllers/AddEmployeeNewController';
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
import AdminManagementController from './controllers/AdminManagementController';
import AdminReassignToCompanyController from './controllers/AdminReassignToCompanyController';
import CompaniesController from './controllers/CompaniesController';
import CompanyOfficesController from './controllers/CompanyOfficesController';
import EditCompanyController from './controllers/EditCompanyController';
import EditEmployeeController from './controllers/EditEmployeeController';
import EditEmployeePermissionsController from './controllers/EditEmployeePermissionsController';
import EditEmployeePreferencesController from './controllers/EditEmployeePreferencesController';
import EditOfficeController from './controllers/EditOfficeController';
import EditTemperatureRangeController from './controllers/EditTemperatureRangeController';
import EmployeeCoworkersController from './controllers/EmployeeCoworkersController';
import EmployeeDetailController from './controllers/EmployeeDetailController';
import EmployeePreferencesController from './controllers/EmployeePreferencesController';
import EmployeeReassignToOfficeController from './controllers/EmployeeReassignToOfficeController';
import FloorplanController from './controllers/FloorplanController';

// Floorplans
import Floorplans_AddController from './controllers/FloorPlans/AddController';
import Floorplans_DesignController from './controllers/FloorPlans/DesignController';
import Floorplans_EditController from './controllers/FloorPlans/EditController';
import Floorplans_ListController from './controllers/FloorPlans/ListController';

import InitializationErrorController from './controllers/Errors/InitializationErrorController';
import LoginController from './controllers/LoginController';
import MainController from './controllers/MainController';
import MyInfoController from './controllers/MyAccount/MyInfoController';
import OfficesController from './controllers/OfficesController';
import OfficeDetailController from './controllers/OfficeDetailController';
import OfficeEmployeesController from './controllers/OfficeEmployeesController';
import PasswordResetController from './controllers/PasswordResetController';
import PasswordResetTokenController from './controllers/PasswordResetTokenController';

// Seating Charts
import SeatingCharts_AddController from './controllers/SeatingCharts/AddController';
import SeatingCharts_ListController from './controllers/SeatingCharts/ListController';
import SeatingCharts_ViewController from './controllers/SeatingCharts/ViewController';

import SeatingChartController from './controllers/SeatingChartController';
import SignOutController from './controllers/MyAccount/SignOutController';
import TeamMembersController from './controllers/TeamMembersController';
import TemperatureRangesController from './controllers/TemperatureRangesController';
import UpdatePasswordController from './controllers/UpdatePasswordController';
import ViewEmployeesController from './controllers/ViewEmployeesController';

iscApp.controller('AddAdminController', AddAdminController);
iscApp.controller('AddAdminToCompanyController', AddAdminToCompanyController);
iscApp.controller('AddAdminToOfficeController', AddAdminToOfficeController);
iscApp.controller('AddCompanyController', AddCompanyController);
iscApp.controller('AddEmployeeNewController', AddEmployeeNewController);
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
iscApp.controller('AdminManagementController', AdminManagementController);
iscApp.controller('AdminReassignToCompanyController', AdminReassignToCompanyController);
iscApp.controller('CompaniesController', CompaniesController);
iscApp.controller('CompanyOfficesController', CompanyOfficesController);
iscApp.controller('EditCompanyController', EditCompanyController);
iscApp.controller('EditEmployeeController', EditEmployeeController);
iscApp.controller('EditEmployeePermissionsController', EditEmployeePermissionsController);
iscApp.controller('EditEmployeePreferencesController', EditEmployeePreferencesController);
iscApp.controller('EditOfficeController', EditOfficeController);
iscApp.controller('EditTemperatureRangeController', EditTemperatureRangeController);
iscApp.controller('EmployeeCoworkersController', EmployeeCoworkersController);
iscApp.controller('EmployeeDetailController', EmployeeDetailController);
iscApp.controller('EmployeePreferencesController', EmployeePreferencesController);
iscApp.controller('EmployeeReassignToOfficeController', EmployeeReassignToOfficeController);
iscApp.controller('FloorplanController', FloorplanController);

// Floorplans
iscApp.controller('Floorplans_AddController', Floorplans_AddController);
iscApp.controller('Floorplans_DesignController', Floorplans_DesignController);
iscApp.controller('Floorplans_EditController', Floorplans_EditController);
iscApp.controller('Floorplans_ListController', Floorplans_ListController);

iscApp.controller('InitializationErrorController', InitializationErrorController);
iscApp.controller('LoginController', LoginController);
iscApp.controller('MainController', MainController);
iscApp.controller('MyInfoController', MyInfoController);
iscApp.controller('OfficesController', OfficesController);
iscApp.controller('OfficeDetailController', OfficeDetailController);
iscApp.controller('OfficeEmployeesController', OfficeEmployeesController);
iscApp.controller('PasswordResetController', PasswordResetController);
iscApp.controller('PasswordResetTokenController', PasswordResetTokenController);

// Seating Charts
iscApp.controller('SeatingCharts_AddController', SeatingCharts_AddController);
iscApp.controller('SeatingCharts_ListController', SeatingCharts_ListController);
iscApp.controller('SeatingCharts_ViewController', SeatingCharts_ViewController);

iscApp.controller('SeatingChartController', SeatingChartController);
iscApp.controller('SignOutController', SignOutController);
iscApp.controller('TeamMembersController', TeamMembersController);
iscApp.controller('TemperatureRangesController', TemperatureRangesController);
iscApp.controller('UpdatePasswordController', UpdatePasswordController);
iscApp.controller('ViewEmployeesController', ViewEmployeesController);

//
// Routes
//

iscApp.config(function ($routeProvider, $locationProvider) {
  // define routes
  $routeProvider
  .when('/add-admin', {
    templateUrl: 'views/add-admin.html',
    controller: 'AddAdminController'
  })
  .when('/add-admin-to-company/:id', {
    templateUrl: 'views/add-admin-to-company.html',
    controller: 'AddAdminToCompanyController'
  })
  .when('/add-admin-to-office/:id', {
    templateUrl: 'views/add-admin-to-office.html',
    controller: 'AddAdminToOfficeController'
  })
  .when('/add-company', {
    templateUrl: 'views/add-company.html',
    controller: 'AddCompanyController'
  })
  /*.when('/add-employee', {
    templateUrl: 'views/add-employee-individual-info.html',
    controller: 'AddEmployeeIndividualInfoController'
  })*/
  .when('/add-employee', {
    templateUrl: 'views/add-employee-new.html',
    controller: 'AddEmployeeNewController'
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
  // .when('/add-superadmin-to-office', {
  //   templateUrl: 'views/start-up/add-superadmin-to-office.html',
  //   controller: 'AddSuperAdminToOfficeController'
  // })
  .when('/add-temperature-range', {
    templateUrl: 'views/add-temperature-range.html',
    controller: 'AddTemperatureRangeController'
  })
  .when('/admin-management', {
    templateUrl: 'views/admin-management.html',
    controller: 'AdminManagementController'
  })
  .when('/admin-reassign-to-company/:id', {
    templateUrl: 'views/admin-reassign-to-company.html',
    controller: 'AdminReassignToCompanyController'
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
  // .when('/edit-employee-permissions', {
  //   templateUrl: 'views/edit-employee-permissions.html',
  //   controller: 'EditEmployeePermissionsController'
  // })
  .when('/edit-employee-preferences/:id', {
    templateUrl: 'views/edit-employee-preferences.html',
    controller: 'EditEmployeePreferencesController'
  })
  .when('/edit-office/:id', {
    templateUrl: 'views/edit-office.html',
    controller: 'EditOfficeController'
  })
  .when('/edit-temperature-range/:id', {
    templateUrl: 'views/edit-temperature-range.html',
    controller: 'EditTemperatureRangeController'
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
  .when('/employee-reassign-to-office/:id', {
    templateUrl: 'views/employee-reassign-to-office.html',
    controller: 'EmployeeReassignToOfficeController'
  })
  .when('/floorplan/:id', {
    templateUrl: 'views/floorplan.html',
    controller: 'FloorplanController'
  })
  //
  // Section: /floor-plans
  //
  .when('/floor-plans', {
    templateUrl: 'views/floor-plans/list.html',
    controller: 'Floorplans_ListController'
  })
  .when('/floor-plans/add', {
    templateUrl: 'views/floor-plans/add.html',
    controller: 'Floorplans_AddController'
  })
  .when('/floor-plans/:id/design', {
    templateUrl: 'views/floor-plans/design.html',
    controller: 'Floorplans_DesignController'
  })
  .when('/floor-plans/:id/edit', {
    templateUrl: 'views/floor-plans/edit.html',
    controller: 'Floorplans_EditController'
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
  .when('/office-detail/:companyID/:officeID', {
    templateUrl: 'views/office-detail.html',
    controller: 'OfficeDetailController'
  })
  .when('/office-employees/:id', {
    templateUrl: 'views/office-employees.html',
    controller: 'OfficeEmployeesController'
  })
  .when('/password-reset/:resetToken', {
    templateUrl: 'views/password-reset-token.html',
    controller: 'PasswordResetTokenController'
  })
  .when('/password-reset', {
    templateUrl: 'views/password-reset.html',
    controller: 'PasswordResetController'
  })
  .when('/seating-chart/:id', {
    templateUrl: 'views/seating-chart.html',
    controller: 'SeatingChartController'
  })
  //
  // Section: /seating-charts
  //
  .when('/seating-charts', {
    templateUrl: 'views/seating-charts/list.html',
    controller: 'SeatingCharts_ListController'
  })
  .when('/seating-charts/add', {
    templateUrl: 'views/seating-charts/add.html',
    controller: 'SeatingCharts_AddController'
  })
  .when('/seating-charts/:id/view', {
    templateUrl: 'views/seating-charts/view.html',
    controller: 'SeatingCharts_ViewController'
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
  .when('/update-password', {
    templateUrl: 'views/update-password.html',
    controller: 'UpdatePasswordController'
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
