import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// View Offices Controller
//
// Show a list of offices
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.header = 'All Offices';
  $scope.add = function() {
    $location.path('/add-office');
  };
  $scope.delete = function(officeID) {
    if (confirm('Are you sure you want to delete this office? This cannot be undone.')) {
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/DeleteOffice/` + officeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log(response);
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
      }, err => {
        //console.log(err);
      });
    }
  };
  $scope.edit = function(officeID) {
    $location.path('/edit-office/' + officeID);
  };
  $scope.view = function(officeID, companyID) {
    $location.path('/office-detail/'+ companyID + '/' + officeID);
  };
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/Verify`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    var permissionLevel = response.data[0].permissionLevel;
    var employeeID = response.data[0].employeeID;
    if (permissionLevel == "admin") {
      $http({
        method: 'GET',
        url : `${env.api.root}/Api/CompaniesForAdmin/` + employeeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log(response);
        $scope.companyID = response.data[0].companyID;
        $location.path('/company-offices/' + $scope.companyID);
      }, err => {
        //console.log(err);
      });
    }
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
    $scope.offices = response.data;
  }, err => {
    //console.log(err);
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
