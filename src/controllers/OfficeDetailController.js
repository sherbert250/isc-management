import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Office Details Controller
//
// Show all properties for an office
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window)  => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.edit = function(officeID) {
    $location.path('/edit-office/' + officeID);
  };
  $scope.companyID = $routeParams.companyID;
  $scope.officeID = $routeParams.officeID;
  $scope.officeDetail = function(companyID, officeID) {
    $window.location.href = '/office-detail/' + companyID + '/' + officeID;
  };
  if ($scope.officeID == 0) {
    $location.path('/company-offices/' + $scope.companyID);
  } else {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log(response);
      $scope.office = response.data[0];
      $scope.header = $scope.office.companyName;
    }, err => {
      //console.log(err);
    });
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/FloorPlanOfOffice/` + $scope.officeID,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log(response);
      $scope.floor_plan = response.data[0];
    }, err => {
      //console.log(err);
    });
  }
}];
