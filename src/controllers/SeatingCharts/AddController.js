import env from '../../core/env';
import _ from 'lodash';
import {createMessage, log} from '../_common';
import {initScope} from './_shared';

//
// Seating Charts (Add) Controller
//
// Display a list of created seating charts
// Provide actions to create/modify charts
//

export default ['$scope', '$http', '$location', '$window', ($scope, $http, $location, $window) => {
  // set up the $scope object with nav settings,
  //  routes, api endpoints, and check permissions
  initScope($scope, $http, $location, $window);

  // fetch offices and seating charts from the API
  $scope.api.fetchOffices(function(err, response) {
    if (err) {
      return log(err);
    }
    const offices = response.data;
    // next, fetch floor plans
    $scope.api.fetchFloorPlans(function(err, response) {
      if (err) {
        return log(err);
      }
      // add floor plans to scope
      $scope.floorPlans = response.data.map(floorPlan => {
        const office = _.find(offices, {officeID: floorPlan.office_id});
        if (office) {
          floorPlan.officeName = office.officeName;
        }
        return floorPlan;
      });
    });
  });

  // set default form data
  const defaultFormData = {
    name: null,
    base_floor_plan_id: null
  };
  $scope.formData = defaultFormData;

  //
  // Handle form submission
  //
  $scope.handleSubmit = function() {
    const {name} = $scope.formData;
    const floorPlanPieces = $scope.formData.base_floor_plan_id.split('-');
    const office_id = floorPlanPieces[0];
    const base_floor_plan_id = floorPlanPieces[1];
    // perform validation
    if (!name) {
      return alert('Please enter a name for the seating chart.');
    }
    if (!base_floor_plan_id) {
      return alert('Please select a base floor plan for the seating chart.');
    }
    // if all checks pass, create the seating chart
    $scope.api.fetchFloorPlan(base_floor_plan_id, function(err, response) {
      if (err) {
        alert('Something went wrong while creating your seating chart.');
        return log(err);
      }
      const base_floor_plan = response.data[0].spots;
      const base_floor_plan_name = response.data[0].name;
      $scope.api.addSeatingChart({name, base_floor_plan, base_floor_plan_name, office_id}, function(err, response) {
        if (err) {
          return log(err);
        }
        // restore default form data
        $scope.formData = defaultFormData;
        $scope.message = {
          text: 'Success! The seating chart was created.',
          type: 'success'
        };
      });
    });
  };
}];
