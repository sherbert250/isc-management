import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
//
// Edit Temperature Range Controller
//
// Call Query to edit temperature range in the database
//

export default ['$http', '$scope', '$location', '$routeParams','$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Edit a Temperature Range";
  $scope.temperatureRangeID = $routeParams.id;
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/TemperatureRange/` + $scope.temperatureRangeID
  }).then(response => {
    ////console.log(response);
    $scope.temperatureRange = response.data[0];
  }, err => {
    ////console.log(err);
  });
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/EditCompany/` + $scope.temperatureRangeID,
      data: $scope.temperatureRange
    })
    .then(response => {
      $window.location.href = '/temperature-ranges';
    }, err => {
      //console.log(err);
    });
  };
}];
