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

    // fetch the office employees
    $scope.api.fetchOfficeEmployees($scope.seatingChart.office_id, function (err, result) {
      if (err) {
        return log(err);
      } else {
        var seating_chart_JSON = $scope.seatingChart.seating_chart ? JSON.parse($scope.seatingChart.seating_chart) : [];
        $scope.officeEmployees = result.data;
        for (var i in seating_chart_JSON) {
          //console.log(seating_chart_JSON[i]);
          for (var j in seating_chart_JSON[i]) {
            for (var k = 0; k < $scope.officeEmployees.length; k++) {
              if ($scope.officeEmployees[k].employeeID == seating_chart_JSON[i][j].userId) {
                seating_chart_JSON[i][j].name = $scope.officeEmployees[k].firstName + ' ' + $scope.officeEmployees[k].lastName;
                console.log(seating_chart_JSON[i][j]);
              }
            }
          }
        }
      }

      //
      // To do: put seating_chart_JSON into spots and have the seating chart application read the attribute name instead of the userID
      //

      //
      // Now, load everything we need for React app
      //

      // add global data
      $window.ISC = {
        initialState: {
          design: {
            cols: $scope.seatingChart.base_floor_plan_cols,
            name: $scope.seatingChart.name,
            rows: $scope.seatingChart.base_floor_plan_rows,
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

      // add materialize js
      var materializeTag = document.createElement('script');
      materializeTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js';
      document.body.appendChild(materializeTag);

      // add bundle after materializeTag
      materializeTag.onload = function() {
        var bundleTag = document.createElement('script');
        bundleTag.src = '/js/designer.js';
        document.body.appendChild(bundleTag);
      };
    });
  });
}];
