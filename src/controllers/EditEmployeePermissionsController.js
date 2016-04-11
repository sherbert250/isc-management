import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Add Company Controller
//
// Call Query to add Company to the database
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Edit Permission Level";
  $scope.selectedEmployee="";
  $scope.message = "";
  $scope.level="";
  $scope.submit = function(){
    $scope.message="";
    if($scope.selectedEmployee ==='' || $scope.level === ''){
      $scope.message="Please select from both drop downs."
    //} else if ($scope.level === 'superadmin') {
      // Scrub teammates, works_at, manages, blacklist, whitelist
      // add employee to all companies
    //} else if ($scope.level === 'admin') {
        // Scrub teammates, works_at, manages, blacklist, whitelist
        // add employee to one company
    } else {
      // Remove from all companies
      // Add to an office
      $http({
        method: 'POST',
        url: `${env.api.root}/Api/EditEmployeePermission/` + $scope.selectedEmployee,
        data: {permissionLevel: $scope.level},
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        $scope.message="Employee Updated."
      }, err => {
      });
    }
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/AllEmployees`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.emps = response.data;

    if(!$window.sessionStorage.token){
        $location.path('/login');
    } else {
      $http({
        method: 'GET',
        url : `${env.api.root}/Api/Verify`,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        $scope.user= response.data[0];
        //Take out the user from the emps
        var temp = $scope.emps.findIndex(x => x.employeeID==$scope.user.employeeID);
        $scope.emps.splice(temp, 1);
      }, err => {
        //console.log(err);
      });
    }
  }, err => {
    //console.log(err);
  });
}];
