import env from '../../core/env';
import permissions from '../../settings/permissions';
import primaryNavItems from '../../settings/primary_nav_items';
import accountNavItems from '../../settings/account_nav_items';
import showAccountInfo from '../../settings/account_info';
import {createHeaders, _initScope} from '../_common';
import _ from 'lodash';

//
// Shared utilities for FloorPlans section
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
    // POST floorplans
    //
    addFloorPlan(newFloorPlan, callback) {
      $http({
        method: 'POST',
        url: `${apiRoot}/Api/FloorPlans`,
        data: newFloorPlan,
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
    // PUT floor plan
    //
    updateFloorPlan(id, newFloorPlan, callback) {
      $http({
        method: 'PUT',
        url: `${apiRoot}/Api/FloorPlans/${id}`,
        data: newFloorPlan,
        headers
      }).then(
        response => callback(null, response),
        err => callback(err)
      );
    },
    //
    // DELETE floorplans/:id
    //
    removeFloorPlan(id, callback) {
      $http({
        method: 'DELETE',
        url: `${apiRoot}/Api/FloorPlans/${id}`,
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
    $location.path('/floor-plans/add');
  };
  $scope.goToDesign = function(id) {
    $location.path(`/floor-plans/${id}/design`);
  };
  $scope.goToEdit = function(id) {
    $location.path(`/floor-plans/${id}/edit`);
  };
  $scope.goToList = function() {
    $location.path('/floor-plans');
  };
  // add api methods
  $scope.api = createApi($http, env.api.root, $window.sessionStorage.token);
  // add delete method
  $scope.openDelete = function(id) {
    if (confirm('Are you sure you want to delete this floor plan? This cannot be undone.')) {
      $scope.api.removeFloorPlan(id, function(err, response) {
        if (err) {
          log(err);
          return $scope.message = {
            text: 'Something went wrong, and we weren\'t able to delete the floor plan.',
            type: 'danger'
          };
        }
        // remove floor plan from view collection
        //  and show success message
        return _.assign($scope, {
          message: {
            text: `Seating chart #${id} was deleted successfully.`,
            type: 'success'
          },
          floorPlans: _.filter($scope.floorPlans, floorPlan => {
            return floorPlan.id !== id;
          })
        });
      });
    }
  }
};
