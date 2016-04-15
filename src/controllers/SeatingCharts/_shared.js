import env from '../../core/env';
import permissions from '../../settings/permissions';
import primaryNavItems from '../../settings/primary_nav_items';
import accountNavItems from '../../settings/account_nav_items';
import showAccountInfo from '../../settings/account_info';

//
// Shared utilities for Seating Chart section
//

/**
 * Create the API headers
 *
 * @param {string} token - The auth token to use in requests
 * @return {object} - Object with api headers
 */
export const createHeaders = token => {
  return {
    'x-access-token': token
  };
}

/**
 * @var {boolean} - Is app in debug mode?
 */
export const debug = true;

/**
 * @var {function} - Wrapper around console.log, behavior dependant on 'debug' var
 */
export const log = () => {
  if (debug) {
    console.log.apply(console, arguments);
  }
};

/**
 * Create an api utility object
 *
 * @param {string} token - The auth token to use in requests
 * @return {object} - Object with api endpoints and wrapped for convenience
 */
export const createApi = ($http, apiRoot, token) => {
  const headers = createHeaders(token);
  return {
    //
    // POST seating-charts
    //
    addSeatingChart(newSeatingChart, callback) {
      $http({
        method: 'POST',
        url: `${apiRoot}/Api/SeatingCharts`,
        data: newSeatingChart,
        headers
      }).then(
        response => {callback(null, response)},
        err => {callback(err)}
      );
    },
    //
    // GET offices
    //
    fetchOffices(callback) {
      $http({
        method: 'GET',
        url: `${apiRoot}/Api/AllCompaniesForAllOffices`,
        headers
      }).then(
        response => {callback(null, response)},
        err => {callback(err)}
      );
    },
    //
    // GET seating-charts
    //
    fetchSeatingCharts(callback) {
      $http({
        method: 'GET',
        url: `${apiRoot}/Api/SeatingCharts`,
        headers
      }).then(
        response => {callback(null, response)},
        err => {callback(err)}
      );
    }
  };
};

/**
 * Initialize the $scope object
 *
 * NOTE: no need to return, since it's an object (passed by reference)
 *
 * @param {object} $scope - The scope object
 * @param {object} $http - The http object
 * @param {object} $location - The location object
 * @param {object} $window - The window object
 */
export const initScope = ($scope, $http, $location, $window) => {
  // add info from settings
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  // check permissions
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  // add routes
  $scope.goToAdd = function() {
    $location.path('/seating-charts/add');
  };
  $scope.goToDesign = function(id) {
    $location.path(`/seating-charts/${id}/design`);
  };
  $scope.goToEdit = function(id) {
    $location.path(`/seating-charts/${id}/edit`);
  };
  $scope.goToList = function() {
    $location.path('/seating-charts');
  };
  // add api methods
  $scope.api = createApi($http, env.api.root, $window.sessionStorage.token);
};

/**
 * Create alert markup
 *
 * @param {string} message - The message to show
 * @param {string} type - The type of alert ('success', 'info', 'warning', or 'danger')
 * @return {string} - The HTML markup for the alert
 */
export const createMessage = (message, type = 'success') => {
  if (['success', 'info', 'warning', 'danger'].indexOf(type) === -1) {
    type = 'success';
  }
  return `<div class="alert alert-${type}">${message}</div>`;
};
