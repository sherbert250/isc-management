import env from '../../core/env';
import _ from 'lodash';
import {createMessage, log} from '../_common';
import {initScopeSuperAdminAccess} from './_shared';

//
// Seating Charts (List) Controller
//
// Display a list of created seating charts
// Provide actions to create/modify charts
//

export default ['$scope', '$http', '$location', '$window', ($scope, $http, $location, $window) => {
  // set up the $scope object with nav settings,
  //  routes, api endpoints, and check permissions
  initScopeSuperAdminAccess($scope, $http, $location, $window);
  $scope.officeID;
  // fetch offices and seating charts from the API
  $scope.api.fetchOffices(function(err, response) {
    if (err) {
      return log(err);
    }
    // add offices to scope
    $scope.offices = response.data;
    // now that we have offices, get seating charts
    $scope.api.fetchActiveSeatingCharts(function(err, response) {
      if (err) {
        return log(err);
      }
      if ($scope.isEmpty(response)) {
        $scope.existsSeatingChart = false;
      } else {
        $scope.existsSeatingChart = true;
      }
      // add seating charts to scope
      $scope.seatingCharts = response.map(seatingChart => {
        const office = _.find($scope.offices, {officeID: seatingChart.office_id});
        seatingChart.office_name = _.get(office, 'officeName');
        return seatingChart;
      });
    });
  });
}];
