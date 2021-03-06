import env from '../../core/env';
import primaryNavItems from '../../settings/primary_nav_items';
import accountNavItems from '../../settings/account_nav_items';
import showAccountInfo from '../../settings/account_info';

//
// Add Initial Temperature Range Controller
//
// Call Query to add initial temperature range to the database
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope.showAccountInfo.show = false;
  for (var i in $scope.primaryNavItems) {
      $scope.primaryNavItems[i].show = false;
  }
  for (var i in $scope.accountNavItems) {
    $scope.accountNavItems[i].show = false;
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
          // Redirect them to initialization-error page
          $location.path('/initialization-error');
        } else {
          alert('Invalid permission level');
          $location.path('/')
        }
      } else {
        $http({
          method: 'GET',
          url : `${env.api.root}/Api/ExistsTemperatureRange`,
          headers: {
            'x-access-token': $window.sessionStorage.token
          }
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
