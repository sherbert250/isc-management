import employees from '../data/employees';
import env from '../core/env';

//
// Office Employees Controller
//
// Show a list of employees
//

export default ['$http', '$scope', '$location', '$routeParams', ($http, $scope, $location, $routeParams) => {
  $scope.emps = employees;
  $scope.officeID = $routeParams.id;
  $scope.add = function() {
    $location.path('/add-employee');
  };
  $scope.delete = function(employeeID) {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/DeleteEmployee/` + employeeID
    }).then(response => {
      console.log(response);
      $scope.emps = response.data;
    }, err => {
      console.log(err);
    });
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/EmployeesOfOffice/` + $scope.officeID
    }).then(response => {
      console.log(response);
      $scope.emps = response.data;
    }, err => {
      console.log(err);
    });
  };
  $scope.edit = function(employeeID) {
    $location.path('/edit-employee/' + employeeID);
  };
  $scope.view = function(employeeID) {
    $location.path('/employee-detail/' + employeeID);
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeesOfOffice/` + $scope.officeID
  }).then(response => {
    console.log(response);
    $scope.emps = response.data;
  }, err => {
    console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Office/` + $scope.officeID
  }).then(response => {
    console.log(response);
    $scope.header = response.data[0].companyName;
  }, err => {
    console.log(err);
  });
}];
