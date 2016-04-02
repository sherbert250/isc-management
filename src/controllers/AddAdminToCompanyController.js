import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';


//
// Reassign Employee To Office Controller
//
// Reassign Employee To Office
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = 'Add Admin to Company';
  $scope.employeeID = $routeParams.id;
  $scope.submit = function() {
    var adder = {
      employeeID: parseInt($scope.employeeID),
      companyID: parseInt($scope.companyID)
    };
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/AddAdminToCompany/`,
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
      }, err => {
        //console.log(err);
      });
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/AllCompanies`
      }).then(response => {
        //console.log(response);
        $scope.companies = response.data;
      }, err => {
        //console.log(err);
      });
    }
  }, err => {
    //console.log(err);
  });
}];
