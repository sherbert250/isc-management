import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Add Employee To Office Controller
//
// Add Employee To Office
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = 'Add Admin to Office';
  $scope.employeeID = $routeParams.id;
  $scope.submit = function() {
    var adder = {
      employeeID: $scope.employeeID,
      officeID: $scope.officeID
    };
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/AddEmployeeToOffice/`,
      data: adder
    })
    .then(response => {
      //console.log(response);
      $window.location.href = "/admin-management";
    },err => {
      //console.log(err);
    });
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/ExistsEmployee/` + $scope.employeeID
  }).then(response => {
    //console.log(response);
    $scope.existsEmployee = response.data[0];
    if ($scope.existsEmployee.result === 0) {
      window.location.href = '/add-admin';
    }
  }, err => {
    //console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/ExistsCompanyForAdmin/` + $scope.employeeID
  }).then(response => {
    //console.log(response);
    $scope.existsCompanyForAdmin = response.data[0];
    if ($scope.existsCompanyForAdmin.result === 0) {
      window.location.href = '/add-admin-to-company/' + $scope.employeeID;
    }
  }).then(err => {

  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/ExistsEmployeeInOffice/` + $scope.employeeID
  }).then(response => {
    //console.log(response);
    $scope.existsCompanyForAdmin = response.data[0];
    if ($scope.existsCompanyForAdmin.result === 1) {
      window.location.href = '/admin-management';
    } else {
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/EmployeeConfidential/` + $scope.employeeID
      }).then(response => {
        //console.log(response);
        $scope.employee = response.data[0];
        if ($scope.employee.pictureAddress !== "") {
          $scope.imageURL = `${env.api.root}/Api/Media/ProfileImage/` + $scope.employeeID;
          $scope.noURL = false;
        } else if ($scope.employee.pictureAddress === "") {
          $scope.imageURL = `${env.api.root}/Api/Media/DefaultImage/` ;
          $scope.noURL = false;
        } else {
          $scope.noURL = true;
        }
        if ($scope.employee.permissionLevel === "superadmin") {
          $http({
            method: 'GET',
            url: `${env.api.root}/Api/AllOffices` + $scope.employeeID
          }).then(response => {
            //console.log(response);
            $scope.offices = response.data;
          }, err => {
            //console.log(err);
          });
        } else if ($scope.employee.permissionLevel === "admin") {
          $http({
            method: 'GET',
            url: `${env.api.root}/Api/CompaniesForAdmin/` + $scope.employeeID
          }).then(response => {
            //console.log(response);
            $scope.company = response.data[0];
            $http({
              method: 'GET',
              url: `${env.api.root}/Api/CompanyOffices/` + $scope.company.companyID
            }).then(response => {
              //console.log(response);
              $scope.offices = response.data;
            }, err => {
              //console.log(err);
            });
          }, err => {
            //console.log(err);
          });
        }
      }, err => {
        //console.log(err);
      });
    }
  }, err => {
    //console.log(err);
  });
}];
