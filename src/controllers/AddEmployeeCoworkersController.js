import env from '../core/env';
import primaryNavItems from '../settings/primary_nav_items';

//
// Add Employee Coworkers Controller
//
// Call Query to add employee coworkers to the database
//

export default ['$http', '$scope', '$location','$window', 'addService', ($http, $scope, $location, $window, addService) => {
  $scope.primaryNavItems = primaryNavItems;
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
      $scope.masterID = response.data[0].employeeID;

      // Perform sanity checks for set-up
      $http({
        method: 'GET',
        url : `${env.api.root}/Api/ExistsCompany`
      }).then(response => {
        //console.log('Response: ', response.data[0]);
        if (response.data[0].result == 0) {
          $window.location.href = '/add-initial-company';
        } else {
          $http({
            method: 'GET',
            url : `${env.api.root}/Api/ExistsOffice`
          }).then(response => {
            //console.log('Response: ', response.data);
            if (response.data[0].result == 0) {
              $window.location.href = '/add-initial-office/' + $scope.masterID;
            } else {
              $http({
                method: 'GET',
                url : `${env.api.root}/Api/ExistsTemperatureRange`
              }).then(response => {
                //console.log('Response: ', response.data);
                if (response.data[0].result == 0) {
                  $window.location.href = '/add-initial-temperature-range';
                }
              }).then(err => {
                //console.log('Error: ', err);
              });
              $http({
                method: 'GET',
                url : `${env.api.root}/Api/ExistsSuperadminWithOffice`
              }).then(response => {
                //console.log('Response: ', response.data);
                if (response.data[0].result == 0) {
                  $window.location.href = '/add-superadmin-to-office';
                }
              }).then(err => {
                //console.log('Error: ', err);
              });
            }
          }).then(err => {
            //console.log('Error: ', err);
          });
        }
      }).then(err => {
        //console.log('Error: ', err);
      });

      // Permission Level
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
  }
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
