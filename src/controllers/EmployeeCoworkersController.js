import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Employee Coworkers Controller
//
// Show a list of all employees in an employee's whitelist
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope.isEmpty = function (obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
  };
  $scope.canEdit = false;
  $scope.canReassign = false;
  $scope.adminAccess = false;
  $scope.hasEmployees = true;
  $scope.employeeID = $routeParams.employeeID;
  $scope.officeID = $routeParams.officeID;
  $scope.companyID;
  $scope = permissions.userPermissionCheck($http, $scope, $location, $window);
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
  $scope.blacklist = [
    {
      employeeID: 0,
      firstName : " ",
      lastName : " ",
      email : " ",
      title: " ",
      department: " "
    }
  ];
  $scope.whitelist = [
    {
      employeeID: 0,
      firstName : " ",
      lastName : " ",
      email : " ",
      title: " ",
      department: " "
    }
  ];
  $scope.editEmployee = function(employeeID) {
    $location.path('/edit-employee/' + employeeID);
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
  $scope.updateCoworkers = function(employeeID, officeID) {
    var coworkers = {
      blacklist : $scope.blacklist,
      whitelist : $scope.whitelist
    };
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/UpdateCoworkers/` + employeeID,
      data : coworkers,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    })
    .then(response => {
      $location.path('/employee-coworkers/' + employeeID + '/' + officeID);
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
    url: `${env.api.root}/Api/EmployeesNotInWhiteListOrBlackList/` + $scope.employeeID + '/' + $scope.officeID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response.data);
    $scope.employees = response.data;
    $scope.employeesCopy = response.data;
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/EmployeeWhitelist/` + $scope.employeeID,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log(response.data);
      $scope.whitelist = response.data;
      $http({
       method: 'GET',
       url: `${env.api.root}/Api/EmployeeBlacklist/` + $scope.employeeID,
       headers: {
         'x-access-token': $window.sessionStorage.token
       }
      }).then(response => {
       //console.log(response.data)
       $scope.blacklist = response.data;
       if ($scope.isEmpty($scope.employees) && $scope.isEmpty($scope.whitelist) && $scope.isEmpty($scope.blacklist) ) {
         $scope.hasEmployees = false;
       }
      }, err => {
       //console.log(err);
      });
    }, err => {
      //console.log(err);
    });
  }, err => {
    //console.log(err);
  });
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
    url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID,
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
      $scope.companyName = response.data[0].companyName;
      $scope.companyID = response.data[0].companyID;
    }
  }, err => {
    //console.log(err);
  });
}];
