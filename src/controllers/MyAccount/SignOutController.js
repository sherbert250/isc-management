import env from '../../core/env';

//
// Sign Out Controller
//
// Sign out of current employee session
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  if(!$window.sessionStorage.token){
  } else {
    delete $window.sessionStorage.token;
  }
  $location.path('/login');
}];
