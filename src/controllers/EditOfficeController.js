import env from '../core/env';
import primaryNavItems from '../settings/primary_nav_items';

//
// Eidt Office Controller
//
// Call Query to edit office to the database
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
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
  $scope.header = "Edit an Office";
  $scope.officeID= $routeParams.id;
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
      $location.path('/offices');
    }, err => {
      //console.log(err);
    });
  };
}];