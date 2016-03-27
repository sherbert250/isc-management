import env from '../../core/env';
import primaryNavItems from '../../settings/primary_nav_items';

//
// My Information Controller
//
// Show all properties for an employee
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window)  => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.adminAccess = false;
  $scope.canReassign = false;
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
  $scope.reassignEmployee = function (employeeID) {
    $location.path('/employee-reassign-to-office/' + employeeID);
  };
  $scope.viewBlacklist = function(employeeID) {
    $location.path('/employee-coworkers/' + employeeID + '/' + $scope.officeID);
  };
  $scope.viewTeamMembers = function(employeeID) {
    $location.path('/team-members/' + employeeID);
  };
  $scope.viewWhitelist = function(employeeID) {
    $location.path('/employee-coworkers/' + employeeID + '/' + $scope.officeID);
  };
  if($scope.officeID != parseInt($scope.officeID, 10)) {
    $scope.officeID = 0;
  }
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

      // Check Permission Level
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          // Redirect them to their info page
          //$location.path('/my-info');
          $scope.adminAccess = true;
          $scope.canReassign = true;
          for (var i in $scope.primaryNavItems) {
            if ($scope.primaryNavItems[i].text == "Offices")
            $scope.primaryNavItems[i].show = true;
          }
        } else if (permissionLevel === 'user') {
          // Redirect them to their info page
          //$location.path('/my-info');
        } else {
          alert('Invalid permission level');
          $location.path('/')
        }
      } else {
        $scope.adminAccess = true;
        $scope.canReassign = true;
        for (var i in $scope.primaryNavItems) {
          $scope.primaryNavItems[i].show = true;
        }
      }
      $scope.collection = response.data;
      $scope.employee = response.data[0];
      $scope.employeeID = $scope.employee.employeeID;
      if ($scope.employee.pictureAddress !== "") {
        $scope.imageURL = `${env.api.root}/Api/Media/ProfileImage/` + $scope.employeeID;
        $scope.noURL = false;
      } else if ($scope.employee.pictureAddress === "") {
        $scope.imageURL = `${env.api.root}/Api/Media/DefaultImage/` ;
        $scope.noURL = false;
      } else {
        $scope.noURL = true;
      }
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
          $http({
            method: 'GET',
            url: `${env.api.root}/Api/CompaniesForAdmin/` + $scope.employeeID
          }).then(response => {
            //console.log(response);
            if ($scope.isEmpty(response.data)) {
              $scope.companyName = "No Company Assigned";
            } else {
              $scope.companyName = response.data[0].companyName;
              $scope.companyID = response.data[0].companyID;
            }
          }, err => {
            //console.log(err);
          });
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
              $scope.companyName = response.data[0].companyName;
              $scope.companyID = response.data[0].companyID;
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
