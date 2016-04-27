import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';
import _ from 'lodash';
import {verifyOfficeAdmin} from './_common';

//
// Seating Chart Controller
//
// Display a list of created seating charts for an office
// Provide actions to create/modify charts
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window)  => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.officeID = $routeParams.id;
  verifyOfficeAdmin($scope, $http, $location, $window, $scope.officeID);
  $scope.header = 'View Seating Charts for ';
  $scope.goToAdd = function() {
    $location.path('/seating-charts/add');
  };
  $scope.goToList = function() {
    $location.path('/seating-charts');
  };
  $scope.goToView = function(id) {
    $location.path(`/seating-charts/${id}/view`);
  };
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
      return false;
    }
    return true;
  };
  $scope.selectActiveSeatingChart = function(id) {
    $location.path(`/select-active-seating-chart/${id}`);
  };
  $scope.removeSeatingChart = function(id, callback) {
    $http({
      method: 'DELETE',
      url: `${env.api.root}/Api/SeatingCharts/${id}`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(
      response => callback(null, response),
      err => callback(err)
    );
  };
  $scope.openDelete = function(id) {
    if (confirm('Are you sure you want to delete this seating chart? This cannot be undone.')) {
      $scope.removeSeatingChart(id, function(err, response) {
        if (err) {
          log(err);
          return $scope.message = {
            text: 'Something went wrong, and we weren\'t able to delete the seating chart.',
            type: 'danger'
          };
        }
        // remove seating chart from view collection
        //  and show success message
        return _.assign($scope, {
          message: {
            text: `Seating chart #${id} was deleted successfully.`,
            type: 'success'
          },
          seatingCharts: _.filter($scope.seatingCharts, seatingChart => {
            return seatingChart.id !== id;
          })
        });
      });
    }
  };
  $scope.populateSeatingChart = function(id, callback) {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/SeatingCharts/${id}/Populate`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(
      response => callback(null, response),
      err => callback(err)
    );
  };
  // add populate method
  $scope.populateChart = function(id) {
    if (confirm('Are you sure you want to populate this seating chart? Any previous results will be overriden.')) {
      $scope.isFetching = true;
      $scope.populateSeatingChart(id, function(err, response) {
        $scope.isFetching = false;
        if (err) {
          log(err);
          return $scope.message = {
            text: 'Something went wrong, and we weren\'t able to populate the seating chart.',
            type: 'danger'
          };
        }
        // remove seating chart from view collection
        //  and show success message
        return _.assign($scope, {
          message: {
            text: `Seating chart #${id} was populated successfully.`,
            type: 'success'
          }
        });
      });
    }
  };
  $scope.officeDetail = function(companyID, officeID) {
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      if (response.data[0].permissionLevel == 'superadmin' && $scope.officeID == 0) {
        $window.location.href = '/offices';
      } else {
        $window.location.href = '/office-detail/' + companyID + '/'+ officeID;
      }
    }, err => {
    });
  };
  if ($scope.officeID == 0) {
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      if (response.data[0].permissionLevel == 'superadmin') {
        $window.location.href = '/seating-charts';
      } else {
        $window.history.back();
      }
    }, err => {
    });
  }
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.office = response.data[0];
    $scope.header += response.data[0].officeName;
    $scope.companyID = response.data[0].companyID;
  }, err => {
    //console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/ExistsSeatingChartForOffice/` + $scope.officeID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    $scope.existsSeatingChart = (response.data[0].result == 1) ? true : false;
  }, err => {
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/SeatingChartsOfOffice/` + $scope.officeID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log('response: ', response);
    $scope.seatingCharts = response.data;
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/ActiveSeatingChartOfOffice/` + $scope.officeID,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      if (!$scope.isEmpty(response.data[0])) {
        $scope.activeSeatingChart = response.data[0];
        for (var i in $scope.seatingCharts) {
          if ($scope.seatingCharts[i].id == $scope.activeSeatingChart.id_seating_chart) {
            $scope.seatingCharts[i].isActive = true;
          } else {
            $scope.seatingCharts[i].isActive = false;
          }
        }
      }
    }, err => {
      //console.log('err: ', err);
    });
  }, err => {
    //console.log('err: ', err);
  });
}];
