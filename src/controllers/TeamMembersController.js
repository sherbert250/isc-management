import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Team Members Controller
//
// Show a list of all team members
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope.adminAccess = false;
  $scope.canEdit = false;
  $scope.canReassign = false;
  $scope.employeeID = $routeParams.id;
  $scope.companyID;
  $scope.hasEmployees = true;
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
  $scope.editEmployee = function(employeeID) {
    $location.path('/edit-employee/' + employeeID);
  };
  $scope.updateTeammates = function(employeeID) {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/EditEmployeeTeammates/` + employeeID,
      data : {teammates: $scope.teammates},
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    })
    .then(response => {
      $window.location.href ='/team-members/' + employeeID;
    }, err => {
    });
  };
  $scope.reassignEmployee = function (employeeID) {
    $location.path('/employee-reassign-to-office/' + employeeID);
  };
  $scope.view = function(employeeID) {
    $location.path('/employee-detail/' + employeeID);
  };
  if($scope.officeID != parseInt($scope.officeID, 10)) {
    $scope.officeID = 0;
  }
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Employee/` + $scope.employeeID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response.data);
    $scope.employee = response.data[0];
    $scope.header = $scope.employee.firstName + ' ' + $scope.employee.lastName;
    if ($scope.employee.pictureAddress !== "") {
      $scope.imageURL = `${env.api.root}/Api/Media/ProfileImage/` + $scope.employeeID;
      $scope.noURL = false;
    } else if ($scope.employee.pictureAddress === "") {
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
    //console.log(response);
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
        $scope.hasEmployees = false;
      }, err => {
        //console.log(err);
      });
    } else {
      //console.log(response.data);
      $scope.officeID = response.data[0].officeID;
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/EmployeesNotInTeammates/` + $scope.employeeID + '/' + $scope.officeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log(response.data);
        $scope.employees = response.data;
        $http({
          method: 'GET',
          url: `${env.api.root}/Api/EmployeeTeammates/` + $scope.employeeID,
          headers: {
            'x-access-token': $window.sessionStorage.token
          }
        }).then(response => {
          //console.log(response);
          $scope.teammates = response.data;
          if ($scope.isEmpty($scope.employees) && $scope.isEmpty($scope.teammates)) {
            $scope.hasEmployees = false;
          }
        }, err => {
          //console.log(err);
        });
      }, err => {
        //console.log(err);
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
