import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Employee Preferences Controller
//
// Show all preferences for an employee
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
  $scope.editPreferences = function(employeeID) {
    $location.path('/edit-employee-preferences/' + employeeID);
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
  if($scope.officeID != parseInt($scope.officeID, 10)) {
    $scope.officeID = 0;
  }
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
