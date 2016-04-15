import env from '../../core/env';
import _ from 'lodash';
import {createMessage, log} from '../_common';
import {initScope} from './_shared';

//
// Floor Plan (Edit) Controller
//
// Display a form to edit the floor plan properties
//

export default ['$scope', '$http', '$location', '$routeParams', '$window', ($scope, $http, $location, $routeParams, $window) => {
  // set up the $scope object with nav settings,
  //  routes, api endpoints, and check permissions
  initScope($scope, $http, $location, $window);

  // get the floor plan id from url params
  const id = $routeParams.id;

  // fetch offices
  $scope.api.fetchOffices(function(err, response) {
    if (err) {
      return log(err);
    }
    // add offices to scope
    $scope.offices = response.data;
    // next, fetch the floor plan
    $scope.api.fetchFloorPlan(id, function(err, response) {
      if (err) {
        return log(err);
      }
      // add floor plans to scope
      const matchingRecords = response.data;
      if (matchingRecords.length === 0) {
        return $scope.goToList();
      }
      const floorPlan = response.data[0];
      floorPlan.office_id = floorPlan.office_id.toString();
      $scope.formData = floorPlan;
    });
  });

  //
  // Handle form submission
  //
  $scope.handleSubmit = function() {
    const {name, office_id, rows, cols} = $scope.formData;
    // perform validation
    if (!name) {
      return alert('Please enter a name for the design.');
    }
    if (!office_id) {
      return alert('Please select an office for the design.');
    }
    if (!rows) {
      return alert('Please specify the number of rows to use in the design (this can be changed later).');
    }
    if (!cols) {
      return alert('Please specify the number of columns to use in the design (this can be changed later).');
    }
    // if all checks pass, create the floorplan and send the user to the design page
    $scope.api.updateFloorPlan(id, $scope.formData, function(err, response) {
      if (err) {
        return log(err);
      }
      // restore default form data
      $scope.message = {
        text: 'Success! The floor plan was updated.',
        type: 'success'
      };
    });
  };
}];
