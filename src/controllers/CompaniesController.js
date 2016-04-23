import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// View Companies Controller
//
// Show a list of Companies
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = 'All Companies';
  $scope.add = function () {
    $location.path('/add-company');
  };
  $scope.delete = function(companyID) {
    if (confirm('Are you sure you want to delete this company? This cannot be undone.')) {
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/DeleteCompany/` + companyID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log(response);
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
      }, err => {
        //console.log(err);
      });
    }
  };
  $scope.edit = function(companyID) {
    $location.path('/edit-company/' + companyID);
  };
  $scope.view = function(companyID) {
    $location.path('/company-offices/' + companyID);
  };
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
