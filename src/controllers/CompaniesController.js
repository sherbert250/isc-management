import employees from '../data/employees';
import env from '../core/env';
import primaryNavItems from '../settings/primary_nav_items'

//
// View Companies Controller
//
// Show a list of Companies
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  // Handle Permissions
  if(!$window.sessionStorage.token){
      $location.path('/login');
  } else {
    // Validate the token
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log('Response: ', response.data[0]);
      // Cookie has expired
      if (response.data.status == 400) {
        delete $window.sessionStorage.token;
        $location.path('/login');
      }
      var permissionLevel = response.data[0].permissionLevel;
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          // Redirect them to their info page
          $location.path('/my-info');
        } else if (permissionLevel === 'user') {
          // Redirect them to their info page
          $location.path('/my-info');
        } else {
          alert('Invalid permission level');
          $location.path('/')
        }
      } else {
        for (var i in $scope.primaryNavItems) {
          $scope.primaryNavItems[i].show = true;
        }
      }
    }).then(err => {
      //console.log('Error: ', err);
    });
  }
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
