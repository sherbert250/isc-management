import env from '../../core/env';
import _ from 'lodash';
import {createMessage, log} from '../_common';
import {initScope} from './_shared';

//
// Floor Plans (Views) Controller
//
// Display the seating chart
//

export default ['$scope', '$http', '$location', '$routeParams', '$window', ($scope, $http, $location, $routeParams, $window) => {
  // set up the $scope object with nav settings,
  //  routes, api endpoints, and check permissions
  initScope($scope, $http, $location, $window);

  // get the id from url params
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
          name: $scope.seatingChart.name,
          spots: $scope.seatingChart.seating_chart ? JSON.parse($scope.seatingChart.seating_chart) : $scope.seatingChart.base_floor_plan ? JSON.parse($scope.seatingChart.base_floor_plan) : undefined
        },
        settings: {
          readOnly: true
        }
      },
      onExit() {
        window.location.replace(window.location.origin + '/seating-charts');
        // $window.history.back();
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
