import employees from '../data/employees';

//
// View Employees Controller
//
// Show a list of employees
//

export default ['$scope', ($scope) => {
  $scope.emps = employees;
}];
