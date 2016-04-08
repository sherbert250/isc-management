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

export default ['$http', '$scope', '$location','$window', 'addService', ($http, $scope, $location, $window, addService) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  };
  $scope.temperatureRanges = [];
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Add an Employee- Preferences";
  $scope.employee = addService.get();
  //console.log($scope.employee);
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/AllTempRanges`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log('Response: ', response.data[0]);
    $scope.temperatureRanges = response.data;
    $scope.employee.temperatureRangeID = response.data[0].rangeID.toString();
  }).then(err => {
    //console.log('Error: ', err);
  });
  $scope.next = function(employee) {
    $scope.employee.temperatureRangeID = parseInt($scope.employee.temperatureRangeID);
    //console.log(employee);
    addService.set(employee);
    //console.log("Added to service" + addService.get());
    var test = addService.get();
    //console.log(test.firstName);;
    $location.path('/add-employee-coworkers');
  };
  if ($scope.isEmpty($scope.employee)) {
    $location.path('/add-employee');
  }
}];
