import env from '../../core/env';
import permissions from '../../settings/permissions';
import primaryNavItems from '../../settings/primary_nav_items';
import accountNavItems from '../../settings/account_nav_items';
import showAccountInfo from '../../settings/account_info';
import {createHeaders, _initScope, _initScopeSuperAdminAccess, _initScopeUserAccess, log} from '../_common';
import _ from 'lodash';

//
// Shared utilities for Floorplans section
//

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
    // GET offices for company
    //
    fetchOfficesForCompany(callback) {
      $http({
        method: 'GET',
        url: `${apiRoot}/Api/Verify`,
        headers
      }).then(
        response => {
          var employee = response.data[0];
          $http({
            method: 'GET',
            url: `${apiRoot}/Api/CompaniesForAdmin/${employee.employeeID}`,
            headers
          }).then(
            response => {
              var company = response.data[0];
              $http({
                method: 'GET',
                url: `${apiRoot}/Api/CompanyOffices/${company.companyID}`,
                headers
              }).then(
                response => callback(null, response),
                err => callback(err)
              );
            },
            err => callback(err)
          );
        },
        err => callback(err)
      );
    },
    //
    // GET offices
    //
    fetchOfficeEmployees(officeId, callback) {
      $http({
        method: 'GET',
        url: `${apiRoot}/Api//EmployeesOfOffice/${officeId}`,
        headers
      }).then(
        response => callback(null, response),
        err => callback(err)
      );
    },
    //
    // GET floor plans
    //
    fetchFloorPlans(callback) {
      $http({
        method: 'GET',
        url: `${apiRoot}/Api/FloorPlans`,
        headers
      }).then(
        response => callback(null, response),
        err => callback(err)
      );
    },
    //
    // GET floor plans for a company
    //
    fetchFloorPlansForCompany(callback) {
      $http({
        method: 'GET',
        url: `${apiRoot}/Api/Verify`,
        headers
      }).then(
        response => {
          var employee = response.data[0];
          $http({
            method: 'GET',
            url: `${apiRoot}/Api/CompaniesForAdmin/${employee.employeeID}`,
            headers
          }).then(
            response => {
              var company = response.data[0];
              $http({
                method: 'GET',
                url: `${apiRoot}/Api/FloorPlansForCompany/${company.companyID}`,
                headers
              }).then(
                response => callback(null, response),
                err => callback(err)
              );
            },
            err => callback(err)
          );
        },
        err => callback(err)
      );
    },
    //
    // GET floor plan
    //
    fetchFloorPlan(id, callback) {
      $http({
        method: 'GET',
        url: `${apiRoot}/Api/FloorPlans/${id}`,
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
    // GET seating-charts
    //
    fetchActiveSeatingCharts(callback) {
      $http({
        method: 'GET',
        url: `${apiRoot}/Api/IsActive`,
        headers
      }).then(
        response => {
          var activeCharts = response.data;
          $http({
            method: 'GET',
            url: `${apiRoot}/Api/SeatingCharts`,
            headers
          }).then(
            response =>  {
              var seatingCharts = response.data;
              for (var i in seatingCharts) {
                seatingCharts[i].isActive = false;
                for (var j in activeCharts) {
                  if (seatingCharts[i].id == activeCharts[j].id_seating_chart) {
                    seatingCharts[i].isActive = true;
                  }
                }
              }
              callback(null, seatingCharts);
            },
            err => callback(err)
          );
        },
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
    // GET seating-chart/:id/populate
    //
    populateSeatingChart(id, callback) {
      $http({
        method: 'GET',
        url: `${apiRoot}/Api/SeatingCharts/${id}/Populate`,
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
  // add utils from ../common
  _initScope($scope, $http, $location, $window);
  // add routes
  $scope.goToAdd = function() {
    $location.path('/seating-charts/add');
  };
  $scope.goToList = function() {
    $location.path('/seating-charts');
  };
  $scope.goToView = function(id) {
    $location.path(`/seating-charts/${id}/view`);
  };
  $scope.goBack = function() {
    $window.history.back();
  };
  $scope.selectActiveSeatingChart = function(officeID) {
    if (officeID) {
      $location.path(`/select-active-seating-chart/${officeID}`);
    } else {
      alert("Please select an office for choosing the active seating chart");
    }
  };
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
      return false;
    }
    return true;
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
  // add populate method
  $scope.populateChart = function(id) {
    if (confirm('Are you sure you want to populate this seating chart? Any previous results will be overriden.')) {
      $scope.isFetching = true;
      $scope.api.populateSeatingChart(id, function(err, response) {
        $scope.isFetching = false;
        if (err) {
          log(err);
          return $scope.message = {
            text: 'Something went wrong, and we weren\'t able to populate the seating chart.',
            type: 'danger'
          };
        }
        // remove seating chart from view collection
        //  and show success message
        return _.assign($scope, {
          message: {
            text: `Seating chart #${id} was populated successfully.`,
            type: 'success'
          }
        });
      });
    }
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
export const initScopeSuperAdminAccess = ($scope, $http, $location, $window) => {
  // add utils from ../common
  _initScopeSuperAdminAccess($scope, $http, $location, $window);
  // add routes
  $scope.goToAdd = function() {
    $location.path('/seating-charts/add');
  };
  $scope.goToList = function() {
    $location.path('/seating-charts');
  };
  $scope.goToView = function(id) {
    $location.path(`/seating-charts/${id}/view`);
  };
  $scope.goBack = function() {
    $window.history.back();
  };
  $scope.selectActiveSeatingChart = function(officeID) {
    if (officeID) {
      $location.path(`/select-active-seating-chart/${officeID}`);
    } else {
      alert("Please select an office for choosing the active seating chart");
    }
  };
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
      return false;
    }
    return true;
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
  // add populate method
  $scope.populateChart = function(id) {
    if (confirm('Are you sure you want to populate this seating chart? Any previous results will be overriden.')) {
      $scope.isFetching = true;
      $scope.api.populateSeatingChart(id, function(err, response) {
        $scope.isFetching = false;
        if (err) {
          log(err);
          return $scope.message = {
            text: 'Something went wrong, and we weren\'t able to populate the seating chart.',
            type: 'danger'
          };
        }
        // remove seating chart from view collection
        //  and show success message
        return _.assign($scope, {
          message: {
            text: `Seating chart #${id} was populated successfully.`,
            type: 'success'
          }
        });
      });
    }
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
export const initScopeUserAccess = ($scope, $http, $location, $window) => {
  // add utils from ../common
  _initScopeUserAccess($scope, $http, $location, $window);
  // add routes
  $scope.goToAdd = function() {
    $location.path('/seating-charts/add');
  };
  $scope.goToList = function() {
    $location.path('/seating-charts');
  };
  $scope.goToView = function(id) {
    $location.path(`/seating-charts/${id}/view`);
  };
  $scope.goBack = function() {
    $window.history.back();
  };
  $scope.selectActiveSeatingChart = function(officeID) {
    if (officeID) {
      $location.path(`/select-active-seating-chart/${officeID}`);
    } else {
      alert("Please select an office for choosing the active seating chart");
    }
  };
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
      return false;
    }
    return true;
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
  // add populate method
  $scope.populateChart = function(id) {
    if (confirm('Are you sure you want to populate this seating chart? Any previous results will be overriden.')) {
      $scope.isFetching = true;
      $scope.api.populateSeatingChart(id, function(err, response) {
        $scope.isFetching = false;
        if (err) {
          log(err);
          return $scope.message = {
            text: 'Something went wrong, and we weren\'t able to populate the seating chart.',
            type: 'danger'
          };
        }
        // remove seating chart from view collection
        //  and show success message
        return _.assign($scope, {
          message: {
            text: `Seating chart #${id} was populated successfully.`,
            type: 'success'
          }
        });
      });
    }
  }
};
