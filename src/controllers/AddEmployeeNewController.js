import env from '../core/env';
import primaryNavItems from '../settings/primary_nav_items';

//
// Add Employee New Controller
//
// Call Query to add employee to the database
//

export default ['$http', '$scope', '$location','$window', 'addService', ($http, $scope, $location, $window, addService) => {
  $scope.primaryNavItems = primaryNavItems;
  
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
  }
  $scope.header = "Add an Employee";
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
    $scope.employee.password=Math.round((Math.pow(36, 8) - Math.random() * Math.pow(36, 7))).toString(36).slice(1);
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
      $location.path('/view-employees');
    }, err => {
      console.log(err);
    });
  };
}];
