import employees from '../data/employees';
import env from '../core/env';

//
// View Offices Controller
//
// Show a list of offices
//

export default ['$http', '$scope', '$location', ($http, $scope, $location) => {
  $scope.header = 'All Offices';
  $scope.add = function() {
    $location.path('/add-office');
  };
  $scope.delete = function(officeID) {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/DeleteOffice/` + officeID
    }).then(response => {
      console.log(response);
    }, err => {
      console.log(err);
    });
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/AllCompaniesForAllOffices`
    }).then(response => {
      console.log(response);
      $scope.offices= response.data;
    }, err => {
      console.log(err);
    });
  };
  $scope.edit = function(officeID) {
    $location.path('/edit-office/' + officeID);
  };
  $scope.view = function(officeID) {
    $location.path('/office-detail/' + officeID);
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/AllCompaniesForAllOffices`
  }).then(response => {
    console.log(response);
    $scope.offices = response.data;
  }, err => {
    console.log(err);
  });
}];
