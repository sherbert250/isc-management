import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';

//
// Employee Blacklist Controller
//
// Show a list of all employees in an employee's blacklist
//

export default ['$http', '$scope', '$location', '$routeParams','$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope = permissions.userPermissionCheck($http, $scope, $location, $window);
  $scope.employeeID = $routeParams.id;
  $scope.header = 'Blacklist for Employee ID ' + $scope.employeeID;
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  };
  $scope.view = function(employeeID) {
    $location.path('/employee-detail/' + employeeID);
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeeBlacklist/` + $scope.employeeID
  }).then(response => {
    //console.log(response);
    $scope.collection = response.data;
  }, err => {
    //console.log(err);
  });
}];
