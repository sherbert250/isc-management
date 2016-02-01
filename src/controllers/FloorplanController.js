import env from '../core/env';

//
// Floorplan Controller
//
// Display a list of created seating charts
// Provide actions to create/modify charts
//

export default ['$http', '$scope', '$location', '$routeParams', ($http, $scope, $location, $routeParams)  => {
  $scope.officeID = $routeParams.id;
  $scope.header = 'hello';
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID
  }).then(response => {
    console.log(response);
    $scope.office = response.data[0];
    $scope.header = response.data[0].companyName;
  }, err => {
    console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/FloorPlanOfOffice/` + $scope.officeID
  }).then(response => {
    console.log(response);
    $scope.floor_plan = response.data[0];
  }, err => {
    console.log(err);
  });
}];
