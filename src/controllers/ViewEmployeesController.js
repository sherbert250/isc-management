import employees from '../data/employees';
import env from '../core/env';

//
// View Employees Controller
//
// Show a list of employees
//

export default ['$scope', '$http', ($scope, $http) => {
  $scope.emps = [];

  $http({
    method: 'GET',
    url: `${env.api.root}/Api/AllEmployees`
  }).then(response => {
    console.log(response);
    $scope.emps = response.data;
  }, err => {
    console.log(err);
  });

  $scope.positions= [{
    'position': 'CEO'
  }, {
    'position': 'Manager'
  }, {
    'position': 'Developer'
  }];
  $scope.orderProperty='firstName'
  $scope.setOrderProperty = function(propertyName) {
    if ($scope.orderProperty === propertyName) {
        $scope.orderProperty = '-' + propertyName;
    } else if ($scope.orderProperty === '-' + propertyName) {
        $scope.orderProperty = propertyName;
    } else {
        $scope.orderProperty = propertyName;
    }
  return $scope.orderProperty;};

}];
