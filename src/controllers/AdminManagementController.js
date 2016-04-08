import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Add Company Controller
//
// Call Query to add Company to the database
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Admin Management";
  $scope.message = "";
  $scope.addAdmin = function() {
    $location.path('/add-admin');
  };
  $scope.addToCompany = function(employeeID) {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/ExistsCompanyForAdmin/` + employeeID,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log(response);
      $scope.existsCompanyForAdmin = response.data[0];
      if ($scope.existsCompanyForAdmin.result === 1) {
        $scope.message = "Company already added for Employee #" + employeeID;
      } else {
        $location.path('/add-admin-to-company/' + employeeID);
      }
    });
  };
  $scope.reassignEmployeeToCompany = function(employeeID, permissionLevel) {
    if (permissionLevel === "superadmin") {
      $scope.message = "Superadmins are assigned to all companies";
    } else {
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/ExistsCompanyForAdmin/` + employeeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log(response);
        $scope.existsCompanyForAdmin = response.data[0];
        if ($scope.existsCompanyForAdmin.result === 1) {
          $location.path('/admin-reassign-to-company/' + employeeID);
        } else {
          $location.path('/add-admin-to-company/' + employeeID);
        }
      });
    }
  };
  $scope.removeFromCompany = function(employeeID, permissionLevel) {
    var companyID;
    var existsCompanyForAdmin;
    if (permissionLevel === "superadmin") {
      $scope.message = "Superadmins must be assigned to all companies";
    } else {
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/existsCompanyForAdmin/` + employeeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        existsCompanyForAdmin = response.data[0];
        if (existsCompanyForAdmin.result === 1) {
          $http({
            method: 'GET',
            url: `${env.api.root}/Api/CompaniesForAdmin/` + employeeID,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
          }).then(response => {
            companyID = response.data[0].companyID;
            $http({
              method: 'GET',
              url: `${env.api.root}/Api/DeleteAdminFromCompany/` + employeeID + "/" + companyID,
              headers: {
                'x-access-token': $window.sessionStorage.token
              }
            }).then(response => {
              $location.path('/add-admin-to-company/' + employeeID);
            });
          });
        } else {
          $scope.message = "No company to delete for admin #" + employeeID;
        }
      });
    }
  };
  $scope.addToOffice = function(employeeID) {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/ExistsOfficeForAdmin/` + employeeID,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log(response);
      $scope.existsOfficeForAdmin = response.data[0];
      if ($scope.existsOfficeForAdmin.result === 1) {
        $scope.message = "Office already added for Employee #" + employeeID
      } else {
        $location.path('/add-admin-to-office/' + employeeID);
      }
    });
  };
  $scope.reassignEmployeeToOffice = function(employeeID) {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/ExistsEmployeeInOffice/` + employeeID,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log(response);
      $scope.existsEmployeeInOffice = response.data[0];
      if ($scope.existsEmployeeInOffice.result === 1) {
        $location.path('/employee-reassign-to-office/' + employeeID);
      } else {
        $location.path('/add-admin-to-office/' + employeeID);
      }
    });
  };
  $scope.removeFromOffice = function(employeeID) {
    var companyID;
    var existsEmployeeInOffice;

    $http({
      method: 'GET',
      url: `${env.api.root}/Api/existsEmployeeInOffice/` + employeeID,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      existsEmployeeInOffice = response.data[0];
      if (existsEmployeeInOffice.result === 1) {
        $http({
          method: 'GET',
          url: `${env.api.root}/Api/DeleteEmployeeFromOffice/` + employeeID,
          headers: {
            'x-access-token': $window.sessionStorage.token
          }
        }).then(response => {
          $scope.message = "Deleted office for admin #" + employeeID;
        });
      } else {
        $scope.message = "No office to delete for admin #" + employeeID;
      }
    });
  };
  $scope.viewAdmin = function(employeeID) {
    $location.path('/employee-detail/' + employeeID);
  };
  $scope.deleteAdmin = function(employeeID) {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/DeleteEmployee/` + employeeID,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log(response);
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/AllAdminEmployees`,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log(response);
        $scope.admins = response.data;
      }, err => {
        //console.log(err);
      });
    }, err => {
      //console.log(err);
    });
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/AllAdminEmployees`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.admins = response.data;
  }, err => {
    //console.log(err);
  });
}];
