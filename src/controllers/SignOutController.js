import env from '../core/env';

//
// Sign Out Controller
//
// Show a list of employees
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  if(!$window.sessionStorage.token){
    $location.path('/login');
  } else {
    delete $window.sessionStorage.token;
    $location.path('/login');
  }
}];
