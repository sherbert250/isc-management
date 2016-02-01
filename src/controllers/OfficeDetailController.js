import env from '../core/env';

//
// Employee Detail Controller
//
// Show all properties for an employee
//

export default ['$http', '$scope', '$location', '$routeParams', ($http, $scope, $location, $routeParams)  => {
  $scope.officeID = $routeParams.id;
  $scope.edit = function(officeID) {
    $location.path('/edit-office/' + officeID);
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID
  }).then(response => {
    console.log(response);
    $scope.office = response.data[0];
    $scope.header = $scope.office.companyName;
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
