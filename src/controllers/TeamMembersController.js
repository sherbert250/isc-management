import teamMembers from '../data/team_members';
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
  $scope.view = function(employeeID) {
    $location.path('/employee-detail/' + employeeID);
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeeTeammates/` + $scope.employeeID
  }).then(response => {
    console.log(response);
    if (!$scope.isEmpty(response.data)) {
      $scope.collection = response.data;
    } else {
      $scope.collection = teamMembers;
    }
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
