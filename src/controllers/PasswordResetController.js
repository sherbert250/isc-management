import env from '../core/env';
import primaryNavItems from '../settings/primary_nav_items';

//
// Password Reset
//
// Allows users to reset passwords
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  for (var i in $scope.primaryNavItems) {
    if (i != 0) { 
      $scope.primaryNavItems[i].show = false;
    }
  }
  if ($window.sessionStorage.token) {
    //Validate the token
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log('Response: ', response);
      // Cookie has expired
      if (response.data.status == 400) {
        //delete $window.sessionStorage.token;
        //$location.path('/login');
      }
      var permissionLevel = response.data[0].permissionLevel;
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          // Redirect them to their info page
          //$location.path('/my-info');
        } else if (permissionLevel === 'user') {
          // Redirect them to their info page
          //$location.path('/my-info');
        } else {
        }
      } else {
        for (var i in $scope.primaryNavItems) {
          $scope.primaryNavItems[i].show = true;
        }
      }
    }).then(err => {
      //console.log('Error: ', err);
    });
    //$location.path('/my-info');
  }
  $scope.header = "Password Reset";
  $scope.invalid=false;
  $scope.success=false;
  $scope.employee = {
    email: ""
  };
  $scope.incorrectLogin = false;
  $scope.submit = function(employee) {
    $scope.invalid=false;
    $scope.success=false;

    var payload = JSON.stringify(employee)
    $http({
      method : "POST",
      url : `${env.api.root}/Api/PasswordReset`,
      data: payload
    })
    .then(response => {
      console.log(response.data.message);
      if(response.data.message==="No such user."){
        $scope.invalid=true;
      }
      else{
        $scope.success=true;
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
