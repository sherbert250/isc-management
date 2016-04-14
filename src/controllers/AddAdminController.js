import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Add Admin Controller
//
// Call Query to add Admin to the database
//

export default ['$http', '$scope', '$location','$window', 'addService', ($http, $scope, $location, $window, addService) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Add an Admin";
  $scope.employee = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
    title: "",
    restroomUsage: 1,
    noisePreference: 1,
    outOfDesk: 1,
    pictureAddress: "",
    permissionLevel: "user"
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
      // Add employee query
      //$scope.employee.companyID = parseInt($scope.employee.companyID, 10);
      $http({
        method: 'POST',
        url: `${env.api.root}/Api/AddEmployee`,
        data: $scope.employee,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      })
      .then(response => {
        addService.set({});
        //$location.path('/view-employees');
      }, err => {
        //console.log(err);
      });
      addService.set({});
      //send Email to new employee
      $http({
        method: 'POST',
        url: `${env.api.root}/Api/SendEmail`,
        data: {to:$scope.employee.email, reason: 'employeeAdd', password: $scope.employee.password},
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      })
      .then(response => {
        addService.set({});
        $window.location.href = '/admin-management';
      }, err => {
        //console.log(err);
      });
    } else {
      alert('Invalid Email: please enter a different email');
    }
  };
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/AllCompanies`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log('Response: ', response.data[0]);
    $scope.companies = response.data;
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
