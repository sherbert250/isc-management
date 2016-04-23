import env from '../../core/env';
import _ from 'lodash';
import {createMessage, log, isViewerAdmin} from '../_common';
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
  isViewerAdmin($http, env.api.root, $window.sessionStorage.token, function(answer){
    if (answer) {
      // fetch offices and seating charts from the API
      $scope.api.fetchOfficesForCompany(function(err, response) {
        if (err) {
          return log(err);
        }
        const offices = response.data;
        // next, fetch floor plans
        $scope.api.fetchFloorPlansForCompany(function(err, response) {
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
    } else {
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
    }
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
    const base_floor_plan_id = parseInt($scope.formData.base_floor_plan_id, 10);
    console.log({base_floor_plan_id, floorPlans: $scope.floorPlans});
    const base_floor_plan = _.find($scope.floorPlans, {id: base_floor_plan_id});
    const base_floor_plan_name = base_floor_plan.name;
    const base_floor_plan_rows = base_floor_plan.rows;
    const base_floor_plan_cols = base_floor_plan.cols;
    const office_id = base_floor_plan.office_id;
    // perform validation
    if (!name) {
      return alert('Please enter a name for the seating chart.');
    }
    if (!base_floor_plan_id) {
      return alert('Please select a base floor plan for the seating chart.');
    }
    // if all checks pass, create the seating chart
    $scope.api.addSeatingChart({
      name,
      base_floor_plan: base_floor_plan.spots,
      base_floor_plan_rows,
      base_floor_plan_cols,
      base_floor_plan_name,
      office_id
    }, function(err, response) {
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
  };
}];
