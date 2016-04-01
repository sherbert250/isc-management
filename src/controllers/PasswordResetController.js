import env from '../core/env';
//import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';

//
// Password Reset
//
// Allows users to reset passwords
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  //$scope = permissions.userPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Password Reset";
  $scope.invalid = false;
  $scope.success = false;
  $scope.tokenCheck= false;
  $scope.employee = {
    email: ""
  };
  $scope.incorrectLogin = false;
  $scope.submit = function(employee) {
    $scope.invalid = false;
    $scope.success = false;


    //verify email

    var payload = JSON.stringify(employee)
    $http({
      method : "POST",
      url : `${env.api.root}/Api/PasswordResetEmailCheck`,
      data: payload
    })
    .then(response => {
      if(response.data.message === "No such user."){
        $scope.invalid=true;
      }
      else{
        //check to see if there is a token for the employee.
        $scope.employeeID=response.data.data[0].employeeID;
    
        //generate Token
        var temp= Math.round((Math.pow(36, 21) - Math.random() * Math.pow(36, 20))).toString(36).slice(1);
        
        $scope.tokenInfo={
          token: temp,
          employeeID: $scope.employeeID
        }
        var tokenPayload=JSON.stringify($scope.tokenInfo);
        console.log("Got to create token");
        //add entry to passwordReset table
        $http({
          method : "POST",
          url : `${env.api.root}/Api/AddPasswordReset`,
          data: tokenPayload
        })
        .then(response => {
          //send Email

          $http({
            method : "POST",
            url : `${env.api.root}/Api/SendEmail`,
            data: {reason: "passwordReset", email: employee.email, token: temp}
          })
          .then(response => {
            $scope.success=true;
          }, err => {
            console.log(err.data.message);
          });
          
        }, err => {
          console.log(err.data.message);
        });
      }
    }, err => {
      console.log(err.data.message);
    });



    //send email with URL


    /*
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
*/
  };
}];
