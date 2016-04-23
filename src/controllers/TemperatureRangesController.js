import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Temperature Ranges Controller
//
// Show a list of temperature ranges
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.canEditDelete = false;
  $scope.header = 'All Temperature Ranges';
  $scope.add = function () {
    $location.path('/add-temperature-range');
  };
  $scope.delete = function(rangeID) {
    if (confirm('Are you sure you want to delete this temperature range? This cannot be undone.')) {
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/DeleteTemperatureRange/` + rangeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log(response);
        $http({
          method: 'GET',
          url: `${env.api.root}/Api/AllTempRanges`,
          headers: {
            'x-access-token': $window.sessionStorage.token
          }
        }).then(response => {
          //console.log(response);
          $scope.temperatureRanges = response.data;
        }, err => {
          //console.log(err);
        });
      }, err => {
        //console.log(err);
      });
    }
  };
  $scope.edit = function(rangeID) {
    $location.path('/edit-temperature-range/' + rangeID);
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Verify`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.check = response.data[0];
    if ($scope.check.permissionLevel == 'superadmin') {
      $scope.canEditDelete = true;
    } else {
      $scope.canEditDelete = false;
    }
  }, err => {
    //console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/AllTempRanges`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.temperatureRanges = response.data;
  }, err => {
    //console.log(err);
  });
}];
