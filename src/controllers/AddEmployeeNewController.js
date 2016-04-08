import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Add Employee New Controller
//
// Call Query to add employee to the database
//

export default ['$http', '$scope', '$location','$window', 'addService', ($http, $scope, $location, $window, addService) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Add an Employee";
  $scope.employee = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
    title: "",
    restroomUsage: 1,
    noisePreference: 1,
    outOfDesk: 1,
    pictureAddress: "",
    permissionLevel: "user"
  };
  $scope.submit = function() {
    $scope.employee.password = Math.round((Math.pow(36, 8) - Math.random() * Math.pow(36, 7))).toString(36).slice(1);
    // Add employee query
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/AddEmployee`,
      data: $scope.employee,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    })
    .then(response => {
      addService.set({});
      //$location.path('/view-employees');
    }, err => {
      //console.log(err);
    });
    addService.set({});
    //send Email to new employee
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/SendEmail`,
      data: {to:$scope.employee.email, reason: 'employeeAdd', password: $scope.employee.password},
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    })
    .then(response => {
      addService.set({});
      $window.location.href = '/view-employees';
    }, err => {
      //console.log(err);
    });
  };
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/AllOffices`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log('Response: ', response.data[0]);
    $scope.offices = response.data;
  }).then(err => {
    //console.log('Error: ', err);
  });
}];
