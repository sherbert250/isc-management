import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
//
// Add Company Controller
//
// Call Query to add Company to the database
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Add a Company";
  $scope.company = {
    companyName : ""
  };
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/AddCompany`,
      data: $scope.company
    })
    .then(response => {
      $window.location.href = '/companies';
    }, err => {
      //console.log(err);
    });
  };
}];
