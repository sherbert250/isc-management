import env from '../core/env';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Password Reset
//
// Allows users to reset passwords
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope.header = "Password Reset";
  $scope.issue = false;
  $scope.validToken = false;
  $scope.invalid = false;
  $scope.message = "";
  $scope.success = false;
  $scope.resetID = 0;
  $scope.employeeID = 0;
  $scope.changeMessage = function() {
    if ($scope.validToken === false) {
      $scope.message="Invalid URL or Password Reset Timed Out.";
    } else if ($scope.invalid) {
      $scope.message="Passwords do not match!"
    } else if($scope.success) {
      $scope.message="Password updated.";
    }
  };
  $scope.employee = {
    email: "",
    password: ""
  };
  $scope.token= $routeParams.resetToken;

  //check if token exists.
  $http({
    method : "GET",
    url : `${env.api.root}/Api/PasswordReset/`+ $scope.token,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  })
  .then(response => {
    //console.log(response);
    if(response.data[0] != null){
      $scope.issue = false;
      $scope.validToken = true;
      $scope.resetID = response.data[0].reset_ID;
      $scope.employeeID = response.data[0].employee_ID;
    } else {
      $scope.issue = true;
      $scope.validToken = false;
      $scope.changeMessage();
    }
  }, err => {
    //console.log(err.data.message);
  });
  $scope.submit = function(employee) {
    $scope.issue = false;
    $scope.invalid = false;
    $scope.success = false;
    if (employee.password !== employee.confirmPassword) {
      $scope.issue = true;
      $scope.invalid = true;
      $scope.changeMessage();
    } else {

      //update the employee info
      $http({
        method : "POST",
        url : `${env.api.root}/Api/PasswordResetUpdate`,
        data: {password: employee.password, employeeID: $scope.employeeID},
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      })
      .then(response => {
        //delete token
        $http({
          method : "GET",
          url : `${env.api.root}/Api/DeletePasswordReset/`+$scope.resetID,
          headers: {
            'x-access-token': $window.sessionStorage.token
          }
        })
        .then(response => {
          $scope.success=true;
          $scope.issue=true;
          $scope.changeMessage();
        }, err => {
          //console.log(err.data.message);
        });
      }, err => {
        //console.log(err.data.message);
      });
    }
  };
}];
