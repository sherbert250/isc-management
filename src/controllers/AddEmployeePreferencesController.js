import env from '../core/env';
import primaryNavItems from '../settings/primary_nav_items';

//
// Add Employee Preferences Controller
//
// Call Query to add employee preferences to the database
//

export default ['$http', '$scope', '$location','$window', 'addService', ($http, $scope, $location, $window, addService) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  };
  $scope.temperatureRanges = [];
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
  $scope.header = "Add an Employee- Preferences";
  $scope.employee = addService.get();
  console.log($scope.employee);
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/AllTempRanges`
  }).then(response => {
    //console.log('Response: ', response.data[0]);
    $scope.temperatureRanges = response.data;
    $scope.employee.temperatureRangeID = response.data[0].rangeID.toString();
  }).then(err => {
    //console.log('Error: ', err);
  });
  $scope.next = function(employee) {
    $scope.employee.temperatureRangeID = parseInt($scope.employee.temperatureRangeID);
    console.log(employee);
    addService.set(employee);
    console.log("Added to service" + addService.get());
    var test = addService.get();
    console.log(test.firstName);;
    $location.path('/add-employee-coworkers');
  };
  if ($scope.isEmpty($scope.employee)) {
    $location.path('/add-employee');
  }
}];
