import env from '../core/env';

//
// Add Employee Controller
//
// Call Query to add employee to the database
//

export default ['$http', '$scope', '$location', '$routeParams', ($http, $scope, $location, $routeParams) => {
  $scope.header = "Edit an Employee";
  $scope.employeeID = $routeParams.id;
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Employee/` + $scope.employeeID
  }).then(response => {
    console.log(response);
    $scope.employee = response.data[0];
  }, err => {
    console.log(err);
  });
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/EditEmployee/`+$scope.employeeID,
      data: $scope.employee
    })
    .then(function (response) {
      $location.path('/view-employees');
    },function (response) {
      alert('error');
    });
  };
}];
