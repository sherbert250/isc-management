import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Select Active Seating Chart for Office Controller
//
// Select a different active seating chart for an office
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.header = 'Select Active Seating Chart for ';
  $scope.officeID = $routeParams.id;
  $scope.seatingChartID;
  $scope.goBack = function() {
    $window.history.back();
  };
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
      return false;
    }
    return true;
  };
  $scope.submit = function () {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/ActiveSeatingChartOfOffice/`+ $scope.officeID,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      if ($scope.isEmpty(response.data)) {
        $http({
          method: 'POST',
          url: `${env.api.root}/Api/IsActive/`,
          headers: {
            'x-access-token': $window.sessionStorage.token
          },
          data: {id_office: $scope.officeID, id_seating_chart: $scope.seatingChartID}
        }).then(response => {
          $window.history.back();
        }, err => {
        });
      } else {
        $http({
          method: 'PUT',
          url: `${env.api.root}/Api/IsActive/`+ $scope.officeID,
          headers: {
            'x-access-token': $window.sessionStorage.token
          },
          data: {id_office: $scope.officeID, id_seating_chart: $scope.seatingChartID}
        }).then(response => {
          $window.history.back();
        }, err => {
        });
      }
    }, err => {
    });
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Office/` + $scope.officeID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log('response: ', response);
    $scope.office = response.data[0];
    $scope.header += $scope.office.officeName;
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/SeatingChartsOfOffice/` + $scope.officeID,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      $scope.seatingCharts = response.data;
    }, err => {
    });
  }, err => {
    //console.log('err: ', err);
  });
}];
