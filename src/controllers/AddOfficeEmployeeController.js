import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Add Office Employee Controller
//
// Call Query to add employee to office in the database
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.employee = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
    title: "",
    noisePreference: 1,
    outOfDesk: 1,
    restroomUsage: 1,
    pictureAddress: "",
    permissionLevel: "user",
    officeID: $routeParams.id
  };
  $scope.employees = [];
  $scope.isEmailValid = function(email) {
    var item;
    for (item in $scope.employees) {
      if ($scope.employees[item].email.toLowerCase() == email.toLowerCase()) {
        return false;
      }
    }
    return true;
  };
  $scope.submit = function() {
    if ($scope.isEmailValid($scope.employee.email)) {
      $scope.employee.password = Math.round((Math.pow(36, 8) - Math.random() * Math.pow(36, 7))).toString(36).slice(1);
      $http({
        method: 'POST',
        url: `${env.api.root}/Api/AddOfficeEmployee`,
        data: $scope.employee,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      })
      .then(response => {
        $window.location.href = '/office-employees/' + $scope.employee.officeID;
      }, err => {
        //console.log(err);
      });
    } else {
      alert('Invalid Email: please enter a different email');
    }
  };
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/Office/` + $scope.employee.officeID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log('Response: ', response.data);
    $scope.employee.officeID = response.data[0].officeID;
    $scope.header = "Add an Employee to " + response.data[0].officeName;
  }).then(err => {
    //console.log('Error: ', err);
  });
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/AllEmployees`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log('Response: ', response.data);
    $scope.employees = response.data;
  }).then(err => {
    //console.log('Error: ', err);
  });
}];
