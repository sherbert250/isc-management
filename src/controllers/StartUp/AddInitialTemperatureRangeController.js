import env from '../../core/env';
import primaryNavItems from '../../settings/primary_nav_items';
//
// Add Initial Temperature Range Controller
//
// Call Query to add initial temperature range to the database
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  for (var i in $scope.primaryNavItems) {
      $scope.primaryNavItems[i].show = false;
  }
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
          $location.path('/initialization-error');
        } else {
          alert('Invalid permission level');
          $location.path('/')
        }
      } else {
        $http({
          method: 'GET',
          url : `${env.api.root}/Api/ExistsTemperatureRange`
        }).then(response => {
          //console.log('Response: ', response.data);
          if (response.data[0].result == 1) {
            $window.location.href = '/temperature-ranges';
          }
        }).then(err => {
          //console.log('Error: ', err);
        });
      }
    }).then(err => {
      //console.log('Error: ', err);
    });
  }
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
