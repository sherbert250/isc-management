import env from '../../core/env';
import permissions from '../../settings/permissions';
import primaryNavItems from '../../settings/primary_nav_items';
import accountNavItems from '../../settings/account_nav_items';
import showAccountInfo from '../../settings/account_info';
import _ from 'lodash';

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
        response => callback(null, response),
        err => callback(err)
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
        response => callback(null, response),
        err => callback(err)
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
        response => callback(null, response),
        err => callback(err)
      );
    },
    //
    // GET seating-chart
    //
    fetchSeatingChart(id, callback) {
      $http({
        method: 'GET',
        url: `${apiRoot}/Api/SeatingCharts/${id}`,
        headers
      }).then(
        response => callback(null, response),
        err => callback(err)
      );
    },
    //
    // PUT seating-chart
    //
    updateSeatingChart(id, newSeatingChart, callback) {
      $http({
        method: 'PUT',
        url: `${apiRoot}/Api/SeatingCharts/${id}`,
        data: newSeatingChart,
        headers
      }).then(
        response => callback(null, response),
        err => callback(err)
      );
    },
    //
    // DELETE seating-charts/:id
    //
    removeSeatingChart(id, callback) {
      $http({
        method: 'DELETE',
        url: `${apiRoot}/Api/SeatingCharts/${id}`,
        headers
      }).then(
        response => callback(null, response),
        err => callback(err)
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
  // add delete method
  $scope.openDelete = function(id) {
    if (confirm('Are you sure you want to delete this seating chart? This cannot be undone.')) {
      $scope.api.removeSeatingChart(id, function(err, response) {
        if (err) {
          log(err);
          return $scope.message = {
            text: 'Something went wrong, and we weren\'t able to delete the seating chart.',
            type: 'danger'
          };
        }
        // remove seating chart from view collection
        //  and show success message
        return _.assign($scope, {
          message: {
            text: `Seating chart #${id} was deleted successfully.`,
            type: 'success'
          },
          seatingCharts: _.filter($scope.seatingCharts, seatingChart => {
            return seatingChart.id !== id;
          })
        });
      });
    }
  }
  // add extra utility methods
  $scope.addCssToHead = href => {
    if (typeof href !== 'string' && href.length > 0) {
      return href.forEach(singleHref => {
        $scope.addCssToHead(singleHref);
      });
    }
    const linkTag = document.createElement('link');
    linkTag.rel = 'stylesheet';
    linkTag.href = href;
    document.getElementsByTagName('head')[0].appendChild(linkTag);
  };
  // add extra utility methods
  $scope.addJsToHead = src => {
    if (typeof src !== 'string' && src.length > 0) {
      return src.forEach(singleSrc => {
        $scope.addJsToHead(singleSrc);
      });
    }
    const scriptTag = document.createElement('script');
    scriptTag.src = src;
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
  };
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
