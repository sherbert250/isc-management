import env from '../../core/env';
import _ from 'lodash';
import {createApi, initScope, log} from './_shared';

//
// Seating Charts (List) Controller
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
    // now that we have offices, get seating charts
    $scope.api.fetchSeatingCharts(function(err, response) {
      if (err) {
        return log(err);
      }
      // add seating charts to scope
      $scope.seatingCharts = response.data.map(seatingChart => {
        const office = _.find($scope.offices, {officeID: seatingChart.office_id});
        seatingChart.office_name = _.get(office, 'officeName');
        return seatingChart;
      });
    });
  });
}];
