import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Add Temperature Range Controller
//
// Call Query to add temperature range to the database
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Add a Temperature Range";
  $scope.temperatureRange = {
    lower: 0,
    upper: 2
  };
  $scope.submit = function() {
    $scope.temperatureRange.upper = $scope.temperatureRange.lower + 2;
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/AddTemperatureRange`,
      data: $scope.temperatureRange,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    })
    .then(response => {
      $window.location.href = '/temperature-ranges';
    }, err => {
      //console.log(err);
    });
  };
}];
