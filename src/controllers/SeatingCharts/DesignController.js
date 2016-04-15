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

  // fetch the seating chart
  $scope.api.fetchSeatingChart(id, function(err, response) {
    if (err) {
      return log(err);
    }
    // add seating charts to scope
    const matchingRecords = response.data;
    if (matchingRecords.length === 0) {
      return $scope.goToList();
    }
    $scope.seatingChart = response.data[0];

    //
    // Now, load everything we need for React app
    //

    // add global data
    $window.ISC = {
      initialState: {
        design: {
          cols: $scope.seatingChart.cols,
          name: $scope.seatingChart.name,
          rows: $scope.seatingChart.rows,
          spots: $scope.seatingChart.spots ? JSON.parse($scope.seatingChart.spots) : undefined
        }
      },
      onDone() {
        window.location.replace(window.location.origin + '/seating-charts');
        // $window.history.back();
      },
      onSave(newDesign) {
        console.log(newDesign);
        newDesign.spots = JSON.stringify(newDesign.spots);
        $scope.api.updateSeatingChart(id, newDesign, function(err, response) {
          if (err) {
            log(err);
            return alert('Something went wrong while updating the seating chart.');
          }
          // restore default form data
          alert('Seating chart data was saved.');
        });
      }
    };

    $scope.addCssToHead([
      'https://fonts.googleapis.com/icon?family=Material+Icons',
      'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css'
    ]);
    $scope.addJsToHead([
      'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js',
      '/js/designer.js'
    ]);
  });
}];
