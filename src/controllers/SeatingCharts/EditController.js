import env from '../../core/env';
import _ from 'lodash';
import {createApi, createMessage, initScope, log} from './_shared';

//
// Seating Charts (Add) Controller
//
// Display a list of created seating charts
// Provide actions to create/modify charts
//

export default ['$scope', '$http', '$location', '$routeParams', '$window', ($scope, $http, $location, $routeParams, $window) => {
  // set up the $scope object with nav settings,
  //  routes, api endpoints, and check permissions
  initScope($scope, $http, $location, $window);

  // get the seating chart id from url params
  const id = $routeParams.id;

  // fetch offices
  $scope.api.fetchOffices(function(err, response) {
    if (err) {
      return log(err);
    }
    // add offices to scope
    $scope.offices = response.data;
    // next, fetch the seating chart
    $scope.api.fetchSeatingChart(id, function(err, response) {
      if (err) {
        return log(err);
      }
      // add seating charts to scope
      const matchingRecords = response.data;
      if (matchingRecords.length === 0) {
        return $scope.goToList();
      }
      const seatingChart = response.data[0];
      seatingChart.office_id = seatingChart.office_id.toString();
      $scope.formData = seatingChart;
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
    // if all checks pass, create the seating chart and send the user to the design page
    $scope.api.updateSeatingChart(id, $scope.formData, function(err, response) {
      if (err) {
        return log(err);
      }
      // restore default form data
      $scope.message = {
        text: 'Success! The seating chart was updated.',
        type: 'success'
      };
    });
  };
}];
