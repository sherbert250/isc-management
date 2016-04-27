import env from '../../core/env';
import _ from 'lodash';
import {createMessage, log} from '../_common';
import {initScope} from './_shared';

//
// Floor Plans (Design) Controller
//
// Display the floorplan designer
//

export default ['$scope', '$http', '$location', '$routeParams', '$window', ($scope, $http, $location, $routeParams, $window) => {
  // set up the $scope object with nav settings,
  //  routes, api endpoints, and check permissions
  initScope($scope, $http, $location, $window);

  // get the floorplan id from url params
  const id = $routeParams.id;

  // fetch the floor plan
  $scope.api.fetchFloorPlan(id, function(err, response) {
    if (err) {
      return log(err);
    }
    // add floorplans to scope
    const matchingRecords = response.data;
    if (matchingRecords.length === 0) {
      return $scope.goToList();
    }
    $scope.floorPlan = response.data[0];

    //
    // Now, load everything we need for React app
    //

    // add global data
    $window.ISC = {
      initialState: {
        design: {
          cols: $scope.floorPlan.cols,
          name: $scope.floorPlan.name,
          rows: $scope.floorPlan.rows,
          spots: $scope.floorPlan.spots ? JSON.parse($scope.floorPlan.spots) : undefined
        }
      },
      onDone() {
        window.location.replace(window.location.origin + '/floor-plans');
        // $window.history.back();
      },
      onSave(newDesign) {
        console.log(newDesign);
        newDesign.spots = JSON.stringify(newDesign.spots);
        newDesign.office_id = $scope.floorPlan.office_id;
        console.log(newDesign.office_id);
        $scope.api.updateFloorPlan(id, newDesign, function(err, response) {
          if (err) {
            log(err);
            return alert('Something went wrong while updating the floor plan.');
          }
          // restore default form data
          alert('Floor plan data was saved.');
        });
      }
    };

    $scope.addCssToHead([
      'https://fonts.googleapis.com/icon?family=Material+Icons',
      'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css'
    ]);
    $scope.addJsToBodyClose([
      'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js',
      '/js/designer.js'
    ]);
  });
}];
