import accountNavItems from '../settings/account_nav_items';
import primaryNavItems from '../settings/primary_nav_items';

//
// Main Controller
//
// Skeleton controller, included for every view
//

export default ['$scope', '$route', '$routeParams', '$location',
($scope, $route, $routeParams, $location) => {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  $scope.accountNavItems = accountNavItems;
  $scope.navLinkClass = path => ($location.path() === path) ? 'active' : '';
  $scope.primaryNavItems = primaryNavItems;
}];
