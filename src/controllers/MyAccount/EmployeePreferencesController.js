import env from '../../core/env';

//
// Employee Detail Controller
//
// Show all properties for an employee
//

export default ['$http', '$scope', '$location', '$routeParams', ($http, $scope, $location, $routeParams)  => {
  $scope.employeeID = $routeParams.id;
  $scope.editEmployee = function(employeeID) {
    $location.path('/edit-employee/' + employeeID);
  };
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeeConfidential/` + $scope.employeeID
  }).then(response => {
    console.log(response.data);
    $scope.collection = response.data;
    $scope.header = $scope.collection[0].firstName + ' ' + $scope.collection[0].lastName;
  }, err => {
    console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeeTemperatureRange/` + $scope.employeeID
  }).then(response => {
    console.log(response.data);
    $scope.temperatureRange = response.data[0];
  }, err => {
    console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/OfficeOfEmployee/` + $scope.employeeID
  }).then(response => {
    if ($scope.isEmpty(response.data)) {
      $scope.companyName = "No Company Assigned";
    } else {
      console.log(response.data);
      $scope.officeID = response.data[0].officeID;
      $scope.companyName = response.data[0].companyName;
    }
  }, err => {
    console.log(err);
  });
}];
