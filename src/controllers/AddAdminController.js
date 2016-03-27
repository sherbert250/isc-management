import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';

//
// Add Employee New Controller
//
// Call Query to add employee to the database
//

export default ['$http', '$scope', '$location','$window', 'addService', ($http, $scope, $location, $window, addService) => {
  $scope.primaryNavItems = primaryNavItems;
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

  $scope.submit = function() {
    $scope.employee.password = Math.round((Math.pow(36, 8) - Math.random() * Math.pow(36, 7))).toString(36).slice(1);
    // Add employee query
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/AddEmployee`,
      data: $scope.employee
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
      data: {to:$scope.employee.email, reason: 'employeeAdd', password: $scope.employee.password}
    })
    .then(response => {
      addService.set({});
      $location.path('/admin-management');
    }, err => {
      console.log(err);
    });
  };
}];
