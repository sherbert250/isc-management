import env from '../../core/env';

//
// Employee Detail Controller
//
// Show all properties for an employee
//

export default ['$http', '$scope', '$location', '$routeParams', ($http, $scope, $location, $routeParams)  => {
  $scope.employeeID = $routeParams.id;
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeeConfidential/` + $scope.employeeID
  }).then(response => {
    console.log(response);
    $scope.collection = response.data;
    $scope.header = $scope.collection[0].firstName + ' ' + $scope.collection[0].lastName;
  }, err => {
    console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeeTemperatureRange/` + $scope.employeeID
  }).then(response => {
    console.log(response);
    $scope.temperatureRange = response.data[0];
  }, err => {
    console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/OfficeOfEmployee/` + $scope.employeeID
  }).then(response => {
    console.log(response);
    $scope.officeID = response.data[0].officeID;
    $scope.companyName = response.data[0].companyName;
  }, err => {
    console.log(err);
  });
}];
