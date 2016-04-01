import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';

//
// Add Employee Individual Info Controller
//
// Call Query to add individual employee info to the database
//

export default ['$http', '$scope', '$location','$window', 'addService', ($http, $scope, $location, $window, addService) => {
  $scope.primaryNavItems = primaryNavItems;
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
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/AllOffices`
  }).then(response => {
    //console.log('Response: ', response.data[0]);
    $scope.offices = response.data;
  }).then(err => {
    //console.log('Error: ', err);
  });
  $scope.header = "Add an Employee- Individual Information";
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
  $scope.next = function(employee) {
    employee.officeID = parseInt(employee.officeID);
    console.log(employee);
    addService.set(employee);
    console.log("Added to service" + addService.get());
    var test = addService.get();
    console.log(test.firstName);
    $location.path('/add-employee-preferences');
  };
}];
