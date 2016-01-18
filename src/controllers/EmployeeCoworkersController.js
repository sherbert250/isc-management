import env from '../core/env';

//
// Employee  Coworkers Controller
//
// Show a list of all employees in an employee's whitelist
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
  $scope.view = function(employeeID) {
    $location.path('/employee-detail/' + employeeID);
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeeWhitelist/` + $scope.employeeID
  }).then(response => {
    console.log(response);
    $scope.whitelist = response.data;
  }, err => {
    console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeeBlacklist/` + $scope.employeeID
  }).then(response => {
    console.log(response);
    $scope.blacklist = response.data;
  }, err => {
    console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Employee/` + $scope.employeeID
  }).then(response => {
    console.log(response);
    $scope.employee = response.data[0];
    $scope.header = $scope.employee.firstName + ' ' + $scope.employee.lastName;
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
