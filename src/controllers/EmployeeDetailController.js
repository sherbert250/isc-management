import env from '../core/env';

//
// Employee Detail Controller
//
// Show all properties for an employee
//

export default ['$http', '$scope', '$location', '$routeParams', ($http, $scope, $location, $routeParams)  => {
  $scope.employeeID = $routeParams.id;
  $scope.viewBlacklist = function(employeeID) {
    $location.path('/employee-blacklist/' + employeeID);
  };
  $scope.viewTeamMembers = function(employeeID) {
    $location.path('/team-members/' + employeeID);
  };
  $scope.viewWhitelist = function(employeeID) {
    $location.path('/employee-whitelist/' + employeeID);
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Employee/` + $scope.employeeID
  }).then(response => {
    console.log(response);
    $scope.collection = response.data;
    $scope.header = 'Details for ' + $scope.collection[0].firstName;
  }, err => {
    console.log(err);
  });
}];
