import env from '../core/env';
import primaryNavItems from '../settings/primary_nav_items';
//
// Edit Temperature Range Controller
//
// Call Query to edit temperature range in the database
//

export default ['$http', '$scope', '$location', '$routeParams','$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  if(!$window.sessionStorage.token){
      $location.path('/login');
  } else {
    // Validate the token
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log('Response: ', response.data[0]);
      // Cookie has expired
      if (response.data.status == 400) {
        delete $window.sessionStorage.token;
        $location.path('/login');
      }
      var permissionLevel = response.data[0].permissionLevel;
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          // Redirect them to their info page
          //$location.path('/my-info');
        } else if (permissionLevel === 'user') {
          // Redirect them to their info page
          $location.path('/my-info');
        } else {
          alert('Invalid permission level');
          $location.path('/')
        }
      } else {
        for (var i in $scope.primaryNavItems) {
          $scope.primaryNavItems[i].show = true;
        }
      }
    }).then(err => {
      //console.log('Error: ', err);
    });
  }
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
      $location.path('/temperature-ranges');
    }, err => {
      //console.log(err);
    });
  };
}];