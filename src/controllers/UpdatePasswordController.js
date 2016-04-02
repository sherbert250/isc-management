import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Update Password Controller
//
// Updates password of an employee
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window)  => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope.adminAccess = false;
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
      return false;
    }
    return true;
  };
  $scope.passwords={
    oldPassword:"",
    password:"",
    password2:""
  };
  $scope = permissions.userPermissionCheck($http, $scope, $location, $window);
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/Verify`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log('Response: ', response.data[0]);
    $scope.collection = response.data;
    $scope.employee = response.data[0];
    $scope.employeeID = $scope.employee.employeeID;
    $scope.header = $scope.employee.firstName + " " + $scope.employee.lastName;
  }, err => {
    //console.log(err);
  });
  $scope.passwordMisMatch=false;
  $scope.invalidOldPassword=false;
  $scope.submit = function(employeeID) {
    $scope.passwordMisMatch=false;
    $scope.invalidOldPassword=false;
    //Call API
    $http({
      method : "POST",
      url : `${env.api.root}/Api/UpdatePassword`,
      data: {oldPassword: $scope.passwords.oldPassword, password: $scope.passwords.password, password2: $scope.passwords.password2, employeeID: employeeID.employeeID},
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': $window.sessionStorage.token
      }
    })
    .then(response => {
      if(response.data.message==="Invalid Old Password."){
        $scope.invalidOldPassword=true;
      }
      else if(response.data.message === "New passwords do not match."){
        $scope.passwordMisMatch=true;
      }
      else{
        delete $window.sessionStorage.token;
        console.log("got here")
        $http({
          method : "POST",
          url : `${env.api.root}/Api/SendEmail`,
          data: {reason: "passwordUpdate", email: $scope.employee.email}
        })
        .then(response => {

        }, err => {
          console.log(err.data.message);
        });
        $location.path('/login');
      }
    }, err => {
    });
  };
}];
