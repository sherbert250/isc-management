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
 * Check to see if an object is empty
 *
 * @param {object} - Object
 * @return {boolean} - True if empty, false if not empty
 */

export const isEmpty = function (obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
    return false;
  }
  return true;
};

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
 * @param {object} token - The token containing the permission level of the employee
 */
export const isViewerAdmin = ($http, apiRoot, token, callback) => {
  $http({
    method: 'GET',
    url: `${apiRoot}/Api/Verify`,
    headers: {
      'x-access-token': token
    }
  }).then(
    response => {
      var check = response.data[0];
      if (check.permissionLevel == 'admin') {
        //console.log(true);
        callback(true);
      } else {
        //console.log(false);
        callback(false);
      }
    },
    err => {
      callback(false);
    }
  );
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
export const verifyCompanyAdmin = ($scope, $http, $location, $window, companyID) => {
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/Verify`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log('employee: ', response.data);
    var employee = response.data[0];
    if (employee.permissionLevel == 'admin') {
      $http({
        method: 'GET',
        url : `${env.api.root}/Api/CompaniesForAdmin/${employee.employeeID}`,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log('office of employee: ', response.data);
        var company = response.data[0];
        if (!isEmpty(company)) {
          if(company.companyID != companyID) {
            $window.history.back();
          }
        } else {
          $window.history.back();
        }
      }, err => {
      });
    }
  }, err => {
  });
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
export const verifyOfficeAdmin = ($scope, $http, $location, $window, officeID) => {
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/Verify`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log('employee: ', response.data);
    var employee = response.data[0];
    if (employee.permissionLevel == 'admin') {
      $http({
        method: 'GET',
        url : `${env.api.root}/Api/OfficeOfEmployee/${employee.employeeID}`,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log('office of employee: ', response.data);
        var office = response.data[0];
        if (!isEmpty(office)) {
          if(office.officeID != officeID) {
            $window.history.back();
          }
        } else {
          $window.history.back();
        }
      }, err => {
      });
    }
  }, err => {
  });
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
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
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
 * Initialize the $scope object
 *
 * NOTE: no need to return, since it's an object (passed by reference)
 *
 * @param {object} $scope - The scope object
 * @param {object} $http - The http object
 * @param {object} $location - The location object
 * @param {object} $window - The window object
 */
export const _initScopeSuperAdminAccess = ($scope, $http, $location, $window) => {
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
 * Initialize the $scope object
 *
 * NOTE: no need to return, since it's an object (passed by reference)
 *
 * @param {object} $scope - The scope object
 * @param {object} $http - The http object
 * @param {object} $location - The location object
 * @param {object} $window - The window object
 */
export const _initScopeUserAccess = ($scope, $http, $location, $window) => {
  // add info from settings
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  // check permissions
  $scope = permissions.userPermissionCheck($http, $scope, $location, $window);
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
