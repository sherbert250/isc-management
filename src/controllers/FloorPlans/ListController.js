import env from '../../core/env';
import _ from 'lodash';
import {createMessage, log} from '../_common';
import {initScope} from './_shared';

//
// Floor Plans (List) Controller
//
// Display a list of all floor plans
//

export default ['$scope', '$http', '$location', '$window', ($scope, $http, $location, $window) => {
  // set up the $scope object with nav settings,
  //  routes, api endpoints, and check permissions
  initScope($scope, $http, $location, $window);

  // fetch offices and floor plans from the API
  $scope.api.fetchOffices(function(err, response) {
    if (err) {
      return log(err);
    }
    // add offices to scope
    $scope.offices = response.data;
    // now that we have offices, get floor plans
    $scope.api.fetchFloorPlans(function(err, response) {
      if (err) {
        return log(err);
      }
      // add floor plans to scope
      $scope.floorPlans = response.data.map(floorPlan => {
        const office = _.find($scope.offices, {officeID: floorPlan.office_id});
        floorPlan.office_name = _.get(office, 'officeName');
        return floorPlan;
      });
    });
  });
}];
