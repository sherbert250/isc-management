import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';

//
// Seating Charts Controller
//
// Display a list of created seating charts
// Provide actions to create/modify charts
//

export default ['$scope','$http', '$location','$window', ($scope, $http, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.message = 'Under Construction';
}];
