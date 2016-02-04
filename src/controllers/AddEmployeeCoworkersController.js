import env from '../core/env';
import primaryNavItems from '../settings/primary_nav_items';

//
// Add Employee Controller
//
// Call Query to add employee to the database
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
  $scope.blacklist = [];
  $scope.whitelist = [];
  if(!$window.sessionStorage.token){
    $location.path('/login');
  } else {
    // Validate the token
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log('Response: ', response.data[0]);
      // Cookie has expired
      if (response.data.status == 400) {
        delete $window.sessionStorage.token;
        $location.path('/login');
      }
      var permissionLevel = response.data[0].permissionLevel;
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          // Redirect them to their info page
          //$location.path('/my-info');
        } else if (permissionLevel === 'user') {
          // Redirect them to their info page
          $location.path('/my-info');
        } else {
          alert('Invalid permission level');
          $location.path('/')
        }
      } else {
        for (var i in $scope.primaryNavItems) {
          $scope.primaryNavItems[i].show = true;
        }
      }
    }).then(err => {
      //console.log('Error: ', err);
    });
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/AllEmployees`
    }).then(response => {
      //console.log('Response: ', response.data[0]);
      $scope.employees = response.data;
    }).then(err => {
      //console.log('Error: ', err);
    });
  }
  $scope.header = "Add an Employee- Coworkers";
  $scope.employee = addService.get();
  console.log($scope.employee);
  $scope.submit = function() {
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
      $location.path('/view-employees');
    }, err => {
      //console.log(err);
    });
    addService.set({});
  };
}];
