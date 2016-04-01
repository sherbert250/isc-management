import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';

//
// Floorplan Controller
//
// Display a list of created seating charts
// Provide actions to create/modify charts
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window)  => {
  $scope.primaryNavItems = primaryNavItems;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.officeID = $routeParams.id;
  $scope.header = 'View Current FloorPLan';
  $scope.submit = function() {
    var adder = {
      chartFile : 'c32.json',
      employeeFile : 'e32.json',
      similarityFile : 's32.json'
    };
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/Algorithm/Execute`,
      data: adder
    }).then(response => {
      console.log(response);
    }, err => {
      //console.log(err);
    });
  };
  if ($scope.officeID == 0) {
    $location.path('/my-info');
  }
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID
  }).then(response => {
    //console.log(response);
    $scope.office = response.data[0];
    $scope.header = response.data[0].companyName;
    $scope.companyID = response.data[0].companyID;
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
}];
