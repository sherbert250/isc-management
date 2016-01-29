import env from '../core/env';

//
// Team Members Controller
//
// Show a list of all team members
//

export default ['$http', '$scope', '$location', '$routeParams', ($http, $scope, $location, $routeParams) => {
  $scope.employeeID = $routeParams.id;
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  };
  $scope.editEmployee = function(employeeID) {
    $location.path('/edit-employee/' + employeeID);
  };
  $scope.view = function(employeeID) {
    $location.path('/employee-detail/' + employeeID);
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeeTeammates/` + $scope.employeeID
  }).then(response => {
    console.log(response.data);
    $scope.collection = response.data;
  }, err => {
    console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Employee/` + $scope.employeeID
  }).then(response => {
    console.log(response.data);
    $scope.employee = response.data[0];
    $scope.header = $scope.employee.firstName + ' ' + $scope.employee.lastName;
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
