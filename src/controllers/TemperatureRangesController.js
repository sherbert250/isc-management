import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items'

//
// Temperature Ranges Controller
//
// Show a list of temperature ranges
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.header = 'All Temperature Ranges';
  $scope.add = function () {
    $location.path('/add-temperature-range');
  };
  $scope.delete = function(rangeID) {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/DeleteTemperatureRange/` + rangeID
    }).then(response => {
      //console.log(response);
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/AllTempRanges`
      }).then(response => {
        //console.log(response);
        $scope.temperatureRanges = response.data;
      }, err => {
        //console.log(err);
      });
    }, err => {
      //console.log(err);
    });
  };
  $scope.edit = function(rangeID) {
    $location.path('/edit-temperature-range/' + rangeID);
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/AllTempRanges`
  }).then(response => {
    //console.log(response);
    $scope.temperatureRanges = response.data;
  }, err => {
    //console.log(err);
  });
}];
