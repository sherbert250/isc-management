import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';

//
// Edit Office Controller
//
// Call Query to edit office to the database
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Edit an Office";
  $scope.officeID = $routeParams.id;
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Office/` + $scope.officeID
  }).then(response => {
    ////console.log(response);
    $scope.office = response.data[0];
  }, err => {
    ////console.log(err);
  });
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/EditOffice/`+$scope.officeID,
      data: $scope.office
    })
    .then(response => {
      $window.location.href = '/offices';
    }, err => {
      //console.log(err);
    });
  };
}];
