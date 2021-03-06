import env from '../../core/env';
import primaryNavItems from '../../settings/primary_nav_items';
import accountNavItems from '../../settings/account_nav_items';
import showAccountInfo from '../../settings/account_info';

//
// My Information Controller
//
// Show all properties for an employee
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window)  => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope.showAccountInfo.show = true;
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
  $scope.officeDetail = function(companyID, officeID) {
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      if (response.data[0].permissionLevel == 'superadmin') {
        $window.location.href = '/offices';
      } else {
        $window.location.href = '/office-detail/' + companyID + '/'+ officeID;
      }
    }, err => {
    });
  };
  $scope.reassignEmployee = function (employeeID) {
    $location.path('/employee-reassign-to-office/' + employeeID);
  };
  $scope.viewBlacklist = function(employeeID) {
    $location.path('/employee-coworkers/' + employeeID + '/' + $scope.officeID);
  };
  $scope.viewSeat = function() {
    $location.path('/seating-charts/' + $scope.seatingChartID + '/view');
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
        url : `${env.api.root}/Api/ExistsCompany`,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log('Response: ', response.data[0]);
        if (response.data[0].result == 0) {
          $window.location.href = '/add-initial-company';
        } else {
          $http({
            method: 'GET',
            url : `${env.api.root}/Api/ExistsOffice`,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
          }).then(response => {
            //console.log('Response: ', response.data);
            if (response.data[0].result == 0) {
              $window.location.href = '/add-initial-office/' + $scope.masterID;
            } else {
              $http({
                method: 'GET',
                url : `${env.api.root}/Api/ExistsTemperatureRange`,
                headers: {
                  'x-access-token': $window.sessionStorage.token
                }
              }).then(response => {
                //console.log('Response: ', response.data);
                if (response.data[0].result == 0) {
                  $window.location.href = '/add-initial-temperature-range';
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
      for (var i in $scope.accountNavItems) {
        $scope.accountNavItems[i].show = true;
      }
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          // Redirect them to their info page
          //$location.path('/my-info');
          $scope.adminAccess = true;
          $scope.canReassign = true;
          for (var i in $scope.primaryNavItems) {
            if ($scope.primaryNavItems[i].text == "Offices" || $scope.primaryNavItems[i].text == "Temperature Ranges")
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
        $scope.canReassign = false;
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
        url: `${env.api.root}/Api/EmployeeTemperatureRange/` + $scope.employeeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log(response.data);
        $scope.temperatureRange = response.data[0];
      }, err => {
        //console.log(err);
      });
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/OfficeOfEmployee/` + $scope.employeeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        if ($scope.isEmpty(response.data)) {
          $http({
            method: 'GET',
            url: `${env.api.root}/Api/CompaniesForAdmin/` + $scope.employeeID,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
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
            url : `${env.api.root}/Api/ActiveSeatingChartOfOffice/` + $scope.officeID,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
          }).then(response => {
            //console.log(response.data);
            if($scope.isEmpty(response.data)) {
              $scope.existActiveSeatingChart = false;
            } else {
              $scope.existActiveSeatingChart = true;
              $scope.seatingChartID = response.data[0].id_seating_chart;
            }
          }, err => {
          });
          $http({
            method: 'GET',
            url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
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
