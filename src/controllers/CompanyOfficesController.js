import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';
import {verifyCompanyAdmin} from './_common';

//
// View Company Offices Controller
//
// Show a list of offices for a company
//

export default ['$http', '$scope', '$location','$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.companyID = $routeParams.id;
  verifyCompanyAdmin($scope, $http, $location, $window, $scope.companyID)
  $scope.controlCompanies = false;
  $scope.canAddEditDelete = false;
  $scope.add = function() {
    $location.path('/add-office');
  };
  $scope.delete = function(officeID) {
    if (confirm('Are you sure you want to delete this company office? This cannot be undone.')) {
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/DeleteOffice/` + officeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log(response);
      }, err => {
        //console.log(err);
      });
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/AllCompaniesForAllOffices`,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log(response);
        $scope.offices= response.data;
      }, err => {
        //console.log(err);
      });
    }
  };
  $scope.edit = function(officeID) {
    $location.path('/edit-office/' + officeID);
  };
  $scope.view = function(officeID) {
    $location.path('/office-detail/' + $scope.companyID + '/' + officeID);
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Verify`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.check = response.data[0];
    if ($scope.check.permissionLevel == 'superadmin') {
      $scope.canAddEditDelete = true;
    } else {
      $scope.canAddEditDelete = false;
    }
  }, err => {
    //console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Company/` + $scope.companyID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.company = response.data[0];
    $scope.header = 'Offices for ' + $scope.company.companyName;
  }, err => {
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/CompanyOffices/` + $scope.companyID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.offices = response.data;
  }, err => {
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/AllCompanies`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.companies = response.data;
  }, err => {
    //console.log(err);
  });
}];
