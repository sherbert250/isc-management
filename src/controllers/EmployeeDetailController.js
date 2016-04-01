import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';

//
// Employee Detail Controller
//
// Show all properties for an employee
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window)  => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.adminAccess = false;
  $scope.canEdit = false;
  $scope.employeeID = $routeParams.id;
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
  /*$scope.viewBlacklist = function(employeeID) {
    $location.path('/employee-blacklist/' + employeeID);
  };
  $scope.viewTeamMembers = function(employeeID) {
    $location.path('/team-members/' + employeeID);
  };
  $scope.viewWhitelist = function(employeeID) {
    $location.path('/employee-whitelist/' + employeeID);
  };*/
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeeConfidential/` + $scope.employeeID
  }).then(response => {
    //console.log(response.data);
    $scope.collection = response.data;
    $scope.header = $scope.collection[0].firstName + ' ' + $scope.collection[0].lastName;
    if ($scope.collection[0].pictureAddress !== "") {
      $scope.imageURL = `${env.api.root}/Api/Media/ProfileImage/` + $scope.employeeID;
      $scope.noURL = false;
    } else {
      $scope.noURL = true;
    }
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
}];
