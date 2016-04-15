import env from '../../core/env';
import _ from 'lodash';
import {createApi, createMessage, initScope, log} from './_shared';

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
    // add offices to scope
    $scope.offices = response.data;
  });

  // set default form data
  const defaultFormData = {
    name: null,
    office_id: null,
    rows: 8,
    cols: 14
  };
  $scope.formData = defaultFormData;

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
    $scope.api.addSeatingChart($scope.formData, function(err, response) {
      if (err) {
        return log(err);
      }
      // restore default form data
      $scope.formData = defaultFormData;
      $scope.message = {
        text: 'Success! The seating chart was created.',
        type: 'success'
      };
    })
  };
}];
