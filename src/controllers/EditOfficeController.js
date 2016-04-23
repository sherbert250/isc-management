import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';
import states from '../settings/states';

//
// Edit Office Controller
//
// Call Query to edit office to the database
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Edit an Office";
  $scope.officeID = $routeParams.id;
  $scope.states = states;
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Office/` + $scope.officeID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    ////console.log(response);
    $scope.office = response.data[0];
  }, err => {
    ////console.log(err);
  });
  $scope.submit = function() {
    if ($scope.office.state == "") {
      alert('Select a state');
    } else {
      $http({
        method: 'POST',
        url: `${env.api.root}/Api/EditOffice/`+$scope.officeID,
        data: $scope.office,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      })
      .then(response => {
        $window.history.back();
      }, err => {
        //console.log(err);
      });
    }
  };
}];
