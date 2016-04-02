import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Add Employee Preferences Controller
//
// Call Query to add employee preferences to the database
//

export default ['$http', '$scope', '$location','$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope.employeeID = $routeParams.id;
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  };
  $scope.temperatureRanges = [];
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Edit Employee Preferences";
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/AllTempRanges`
  }).then(response => {
    //console.log('Response: ', response.data[0]);
    $scope.temperatureRanges = response.data;
  }).then(err => {
    //console.log('Error: ', err);
  });
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/Employee/` + $scope.employeeID
  }).then(response => {
    //console.log('Response: ', response.data[0]);
    $scope.employee = response.data[0];
  }).then(err => {
    //console.log('Error: ', err);
  });
  $scope.submit = function() {
    $scope.employee.temperatureRangeID = parseInt($scope.employee.temperatureRangeID);
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/EditEmployeePreferences/` + $scope.employeeID,
      data: $scope.employee
    })
    .then(response => {
      $location.path('/employee-preferences/' + $scope.employeeID );
    }, err => {
    });
  };
}];
