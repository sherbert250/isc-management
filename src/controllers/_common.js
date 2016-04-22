import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';
import _ from 'lodash';

//
// Shared utilities for controllors
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
 * Initialize the $scope object
 *
 * NOTE: no need to return, since it's an object (passed by reference)
 *
 * @param {object} $scope - The scope object
 * @param {object} $http - The http object
 * @param {object} $location - The location object
 * @param {object} $window - The window object
 */
export const _initScope = ($scope, $http, $location, $window) => {
  // add info from settings
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  // check permissions
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
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
  $scope.addJsToBodyClose = src => {
    if (typeof src !== 'string' && src.length > 0) {
      return src.forEach(singleSrc => {
        $scope.addJsToBodyClose(singleSrc);
      });
    }
    const scriptTag = document.createElement('script');
    scriptTag.src = src;
    document.body.appendChild(scriptTag);
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
