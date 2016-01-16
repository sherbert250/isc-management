import employees from '../data/employees';
import env from '../core/env';

//
// View Employees Controller
//
// Show a list of employees
//

export default ['$http', '$scope', '$location', ($http, $scope, $location) => {
  $scope.emps = employees;
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
      url: `${env.api.root}/Api/AllEmployees`
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
    url: `${env.api.root}/Api/AllEmployees`
  }).then(response => {
    console.log(response);
    $scope.emps = response.data;
  }, err => {
    console.log(err);
  });
}];
