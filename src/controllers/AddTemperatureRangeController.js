import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
//
// Add Temperature Range Controller
//
// Call Query to add temperature range to the database
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Add a Temperature Range";
  $scope.temperatureRange = {
    lower: 0,
    upper: 1
  };
  $scope.submit = function() {
    var temp;
    if ($scope.temperatureRange.lower > $scope.temperatureRange.upper) {
      temp = $scope.temperatureRange.lower;
      $scope.temperatureRange.lower = $scope.temperatureRange.upper;
      $scope.temperatureRange.upper = temp;
    }
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/AddTemperatureRange`,
      data: $scope.temperatureRange
    })
    .then(response => {
      $window.location.href = '/temperature-ranges';
    }, err => {
      //console.log(err);
    });
  };
}];
