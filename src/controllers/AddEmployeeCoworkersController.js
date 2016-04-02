import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Add Employee Coworkers Controller
//
// Call Query to add employee coworkers to the database
//

export default ['$http', '$scope', '$location','$window', 'addService', ($http, $scope, $location, $window, addService) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.teammates = [
  ];
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
      return false;
    }
    return true;
  };
  $scope.employees = [
    {
      employeeID: 0,
      firstName : " ",
      lastName : " ",
      email : " ",
      title: " ",
      department: " "
    }
  ];
  $scope.possibleTeammates = [
    {
      employeeID: 0,
      firstName : " ",
      lastName : " ",
      email : " ",
      title: " ",
      department: " "
    }
  ];
  $scope.blacklist = [];
  $scope.whitelist = [];
  $scope.header = "Add an Employee- Coworkers";
  $scope.employee = addService.get();
  console.log($scope.employee);
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/EmployeesNotInWhiteListOrBlackList/` + 0 + '/'+ $scope.employee.officeID
  }).then(response => {
    //console.log('Response: ', response.data[0]);
    $scope.employees = response.data;
  }).then(err => {
    //console.log('Error: ', err);
  });
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/EmployeesOfOffice/` + $scope.employee.officeID
  }).then(response => {
    //console.log('Response: ', response.data[0]);
    $scope.possibleTeammates = response.data;
  }).then(err => {
    //console.log('Error: ', err);
  });
  $scope.submit = function() {
    $scope.employee.teammates = $scope.teammates;
    $scope.employee.whitelist = $scope.whitelist;
    $scope.employee.blacklist = $scope.blacklist;
    console.log($scope.employee);

    // Add employee query
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/AddEmployee`,
      data: $scope.employee
    })
    .then(response => {
      addService.set({});
      $window.location.href = '/view-employees';
    }, err => {
      //console.log(err);
    });
    addService.set({});
  };
  if ($scope.isEmpty($scope.employee)) {
    $location.path('/add-employee');
  }
}];
