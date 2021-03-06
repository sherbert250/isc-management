import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Edit Company Controller
//
// Call Query to Edit Company in the database
//

export default ['$http', '$scope', '$location', '$routeParams','$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Edit a Company";
  $scope.companyID = $routeParams.id;
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Company/` + $scope.companyID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    ////console.log(response);
    $scope.company = response.data[0];
  }, err => {
    ////console.log(err);
  });
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/EditCompany/` + $scope.companyID,
      data: $scope.company,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    })
    .then(response => {
      $window.location.href = '/companies';
    }, err => {
      //console.log(err);
    });
  };
}];
