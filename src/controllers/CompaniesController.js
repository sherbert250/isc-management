import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items'

//
// View Companies Controller
//
// Show a list of Companies
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = 'All Companies';
  $scope.add = function () {
    $location.path('/add-company');
  };
  $scope.delete = function(companyID) {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/DeleteCompany/` + companyID
    }).then(response => {
      //console.log(response);
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/AllCompanies`
      }).then(response => {
        //console.log(response);
        $scope.companies = response.data;
      }, err => {
        //console.log(err);
      });
    }, err => {
      //console.log(err);
    });
  };
  $scope.edit = function(companyID) {
    $location.path('/edit-company/' + companyID);
  };
  $scope.view = function(companyID) {
    $location.path('/company-offices/' + companyID);
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/AllCompanies`
  }).then(response => {
    //console.log(response);
    $scope.companies = response.data;
  }, err => {
    //console.log(err);
  });
}];
