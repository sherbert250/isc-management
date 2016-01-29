import env from '../core/env';

//
// Add Employee Controller
//
// Call Query to add employee to the database
//

export default ['$http', '$scope', '$location', '$routeParams', ($http, $scope, $location, $routeParams) => {
  $scope.header = "Edit an Office";
  $scope.officeID= $routeParams.id;
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Office/` + $scope.officeID
  }).then(response => {
    console.log(response);
    $scope.office = response.data[0];
  }, err => {
    console.log(err);
  });
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/EditOffice/`+$scope.officeID,
      data: $scope.office
    })
    .then(function (response) {
      $location.path('/offices');
    },function (response) {
      alert('error');
    });
  };
}];
