import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// View Company Offices Controller
//
// Show a list of offices for a company
//

export default ['$http', '$scope', '$location','$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope.companyID = $routeParams.id;
  $scope.controlCompanies = false;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.add = function() {
    $location.path('/add-office');
  };
  $scope.delete = function(officeID) {
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
  };
  $scope.edit = function(officeID) {
    $location.path('/edit-office/' + officeID);
  };
  $scope.view = function(officeID) {
    $location.path('/office-detail/' + $scope.companyID + '/' + officeID);
  };
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
