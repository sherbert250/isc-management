import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Employee Detail Controller
//
// Show all properties for an employee
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window)  => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope.adminAccess = false;
  $scope.canEdit = false;
  $scope.canReassign = false;
  $scope.employeeID = $routeParams.id;
  $scope.companyID;
  $scope = permissions.userPermissionCheck($http, $scope, $location, $window);
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
      url : `${env.api.root}/Api/EmployeeConfidential/` + $scope.employeeID,
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
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/Verify`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    if ((response.data[0].employeeID == $scope.employeeID) && (response.data[0].permissionLevel == 'superadmin')) {
      $scope.canReassign = false;
    }
  }, err => {
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeeConfidential/` + $scope.employeeID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response.data);
    $scope.collection = response.data;
    $scope.header = $scope.collection[0].firstName + ' ' + $scope.collection[0].lastName;
    if ($scope.collection[0].pictureAddress !== "") {
      $scope.imageURL = `${env.api.root}/Api/Media/ProfileImage/` + $scope.employeeID;
      $scope.noURL = false;
    } else if ($scope.collection[0].pictureAddress === "") {
      $scope.imageURL = `${env.api.root}/Api/Media/DefaultImage/` ;
      $scope.noURL = false;
    } else {
      $scope.noURL = true;
    }
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
}];
