import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items'

//
// Office Details Controller
//
// Show all properties for an office
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window)  => {
  $scope.primaryNavItems = primaryNavItems;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.edit = function(officeID) {
    $location.path('/edit-office/' + officeID);
  };
  $scope.companyID = $routeParams.companyID;
  $scope.officeID = $routeParams.officeID;
  if ($scope.officeID == 0) {
    $location.path('/company-offices/' + $scope.companyID);
  } else {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID
    }).then(response => {
      //console.log(response);
      $scope.office = response.data[0];
      $scope.header = $scope.office.companyName;
    }, err => {
      //console.log(err);
    });
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/FloorPlanOfOffice/` + $scope.officeID
    }).then(response => {
      //console.log(response);
      $scope.floor_plan = response.data[0];
    }, err => {
      //console.log(err);
    });
  }
}];
