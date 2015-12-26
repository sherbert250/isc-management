import employees from '../data/employees';

//
// View Employees Controller
//
// Show a list of employees
//

export default ['$scope', ($scope) => {
  $scope.emps = employees;
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

