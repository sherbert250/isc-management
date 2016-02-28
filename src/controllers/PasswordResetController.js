import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';

//
// Password Reset
//
// Allows users to reset passwords
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope = permissions.userPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Password Reset";
  $scope.invalid = false;
  $scope.success = false;
  $scope.employee = {
    email: ""
  };
  $scope.incorrectLogin = false;
  $scope.submit = function(employee) {
    $scope.invalid = false;
    $scope.success = false;

    var payload = JSON.stringify(employee)
    $http({
      method : "POST",
      url : `${env.api.root}/Api/PasswordReset`,
      data: payload
    })
    .then(response => {
      console.log(response.data.message);
      if(response.data.message === "No such user."){
        $scope.invalid = true;
      }
      else{
        $scope.success = true;
        $http({
          method : "POST",
          url : `${env.api.root}/Api/SendEmail`,
          data: {reason: "passwordReset", email: payload.email}
        })
        .then(response => {

        }, err => {
          console.log(err.data.message);
        });
      }
    }, err => {
      console.log(err.data.message);
    });
  };
}];
