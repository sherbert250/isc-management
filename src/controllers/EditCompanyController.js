import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
//
// Edit Company Controller
//
// Call Query to Edit Company in the database
//

export default ['$http', '$scope', '$location', '$routeParams','$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Edit a Company";
  $scope.companyID = $routeParams.id;
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Company/` + $scope.companyID
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
      data: $scope.company
    })
    .then(response => {
      $window.location.href = '/companies';
    }, err => {
      //console.log(err);
    });
  };
}];
