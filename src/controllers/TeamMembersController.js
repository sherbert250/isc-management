import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';

//
// Team Members Controller
//
// Show a list of all team members
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.adminAccess = false;
  $scope.canEdit = false;
  $scope.employeeID = $routeParams.id;

  $scope.sortType = 'firstName';
  $scope.sortReverse = false;

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
  $scope.teammates = [
    {
      employeeID: 0,
      firstName : " ",
      lastName : " ",
      email : " ",
      title: " ",
      department: " "
    }
  ];
  $scope = permissions.userPermissionCheck($http, $scope, $location, $window);
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  };
  $scope.editEmployee = function(employeeID) {
    $location.path('/edit-employee/' + employeeID);
  };
  $scope.updateTeammates = function(employeeID) {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/EditEmployeeTeammates/` + employeeID,
      data : {teammates: $scope.teammates}
    })
    .then(response => {
      $window.location.href ='/team-members/' + employeeID;
    }, err => {
    });
  };
  $scope.view = function(employeeID) {
    $location.path('/employee-detail/' + employeeID);
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeeTeammates/` + $scope.employeeID
  }).then(response => {
    //console.log(response.data);
    $scope.teammates = response.data;
  }, err => {
    //console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Employee/` + $scope.employeeID
  }).then(response => {
    //console.log(response.data);
    $scope.employee = response.data[0];
    $scope.header = $scope.employee.firstName + ' ' + $scope.employee.lastName;
    if ($scope.employee.pictureAddress !== "") {
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
        url: `${env.api.root}/Api/EmployeesNotInTeammates/` + $scope.employeeID + '/' + $scope.officeID
      }).then(response => {
        //console.log(response.data);
        $scope.employees = response.data;
      }, err => {
        //console.log(err);
      });
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
