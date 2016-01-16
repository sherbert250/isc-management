import teamMembers from '../data/team_members';
import env from '../core/env';

//
// Team Members Controller
//
// Show a list of all team members
//

export default ['$http', '$scope', '$location', '$routeParams', ($http, $scope, $location, $routeParams) => {
  $scope.employeeID = $routeParams.id;
  $scope.header = 'Team Members for Employee ID ' + $scope.employeeID;
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
}];
