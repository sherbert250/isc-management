import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';
import _ from 'lodash';

//
// Floorplan Controller
//
// Display a list of created seating charts
// Provide actions to create/modify charts
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window)  => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.officeID = $routeParams.id;
  $scope.header = 'View Floorplans for ';
  $scope.goToAdd = function() {
    $location.path('/floor-plans/add');
  };
  $scope.goToDesign = function(id) {
    $location.path(`/floor-plans/${id}/design`);
  };
  $scope.goToEdit = function(id) {
    $location.path(`/floor-plans/${id}/edit`);
  };
  $scope.goToList = function() {
    $location.path('/floor-plans');
  };
  $scope.removeFloorPlan = function(id, callback) {
    $http({
      method: 'DELETE',
      url: `${env.api.root}/Api/FloorPlans/${id}`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(
      response => callback(null, response),
      err => callback(err)
    );
  };
  $scope.openDelete = function(id) {
    if (confirm('Are you sure you want to delete this floor plan? This cannot be undone.')) {
      $scope.removeFloorPlan(id, function(err, response) {
        if (err) {
          log(err);
          return $scope.message = {
            text: 'Something went wrong, and we weren\'t able to delete the floor plan.',
            type: 'danger'
          };
        }
        // remove floor plan from view collection
        //  and show success message
        return _.assign($scope, {
          message: {
            text: `Floor plan #${id} was deleted successfully.`,
            type: 'success'
          },
          floorPlans: _.filter($scope.floorPlans, floorPlan => {
            return floorPlan.id !== id;
          })
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
        $window.location.href = '/floor-plans';
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
    url: `${env.api.root}/Api/FloorPlansOfOffice/` + $scope.officeID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log('response: ', response);
    $scope.floorPlans = response.data;
  }, err => {
    //console.log('err: ', err);
  });
}];
