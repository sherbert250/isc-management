import env from '../core/env';

//
// Add Login Controller
//
// Allows users to login in
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
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
        delete $window.sessionStorage.token;
        $location.path('/login');
      }
    }).then(err => {
      //console.log('Error: ', err);
    });
    $location.path('/my-info');
  }
  $scope.header = "Login to Ideal Seating Chart";
  $scope.employee = {
    email: "",
    password: ""
  };
  $scope.incorrectLogin = false;
  $scope.submit = function(employee) {
    var payload = JSON.stringify(employee)
    $http({
      method : "POST",
      url : `${env.api.root}/Api/Authenticate`,
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': $window.sessionStorage.token
      }
    })
    .then(response => {
      $window.sessionStorage.token = response.data.token;
      $scope.message = response.data.message;
      if($window.sessionStorage.token === 'undefined' || $window.sessionStorage.token === null) {
        $scope.incorrectLogin = true;
      } else {
        $location.path('/my-info');
      }
    }, err => {
      delete $window.sessionStorage.token;
      $scope.message = err.data.message;
    });
  };
}];
