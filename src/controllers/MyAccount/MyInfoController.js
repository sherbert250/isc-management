import env from '../../core/env';
import primaryNavItems from '../../settings/primary_nav_items';

//
// My Information Controller
//
// Show all properties for an employee
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window)  => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.adminAccess = false;
  $scope.editEmployee = function(employeeID) {
    $location.path('/edit-employee/' + employeeID);
  };
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  };
  $scope.viewBlacklist = function(employeeID) {
    $location.path('/employee-blacklist/' + employeeID);
  };
  $scope.viewTeamMembers = function(employeeID) {
    $location.path('/team-members/' + employeeID);
  };
  $scope.viewWhitelist = function(employeeID) {
    $location.path('/employee-whitelist/' + employeeID);
  };
  if(!$window.sessionStorage.token){
      $location.path('/login');
  } else {
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log(response.data);
      if (response.data.status == 400) {
        delete $window.sessionStorage.token;
        $location.path('/login');
      }
      var permissionLevel = response.data[0].permissionLevel;
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          // Redirect them to their info page
          //$location.path('/my-info');
          $scope.adminAccess = true;
        } else if (permissionLevel === 'user') {
          // Redirect them to their info page
          $location.path('/my-info');
        } else {
          alert('Invalid permission level');
          $location.path('/')
        }
      } else {
        $scope.adminAccess = true;
        for (var i in $scope.primaryNavItems) {
          $scope.primaryNavItems[i].show = true;
        }
      }
      $scope.collection = response.data;
      $scope.employee = response.data[0];
      $scope.employeeID = $scope.employee.employeeID;
      $scope.header = $scope.employee.firstName + " " + $scope.employee.lastName;
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/EmployeeTemperatureRange/` + $scope.employeeID
      }).then(response => {
        //console.log(response.data);
        $scope.temperatureRange = response.data[0];
      }, err => {
        //console.log(err);
      });
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/OfficeOfEmployee/` + $scope.employeeID
      }).then(response => {
        if ($scope.isEmpty(response.data)) {
          $scope.companyName = "No Company Assigned";
        } else {
          //console.log(response.data);
          $scope.officeID = response.data[0].officeID;
          $http({
            method: 'GET',
            url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID
          }).then(response => {
            if ($scope.isEmpty(response.data)) {
              $scope.companyName = "No Company Assigned";
            } else {
              //console.log(response.data);
              $scope.companyName = response.data[0].companyName
            }
          }, err => {
            //console.log(err);
          });
        }
      }, err => {
        //console.log(err);
      });
    }, err => {
      //console.log(err);
    });
  }
}];
