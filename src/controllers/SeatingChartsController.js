import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';
import _ from 'lodash';

//
// Seating Charts Controller
//
// Display a list of created seating charts
// Provide actions to create/modify charts
//

export default ['$scope','$http', '$location','$window', ($scope, $http, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);

  /**
   * @var {object} - Request headers
   */
  const headers = {
    'x-access-token': $window.sessionStorage.token
  };

  /**
   * Fetch the offices
   */
  const fetchOffices = () => {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/AllCompaniesForAllOffices`,
      headers
    }).then(response => {
      // console.log(response);
      $scope.offices = response.data;
      fetchSeatingCharts($scope.offices);
    }, err => {
      // console.log(err);
    });
  };
  fetchOffices();

  /**
   * Fetch the seating charts
   *
   * @param {array} offices - The list of offices (for deriving relational data)
   */
  const fetchSeatingCharts = offices => {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/AllSeatingCharts`,
      headers
    }).then(response => {
      // console.log(response);
      $scope.seating_charts = response.data.map(seatingChart => {
        const office = _.find(offices, {officeID: seatingChart.office_id});
        if (office) {
          seatingChart.officeName = office.officeName;
        }
        return seatingChart;
      });
    }, err => {
      // console.log(err);
    });
  };
}];
