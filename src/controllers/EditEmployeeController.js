import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Edit Employee Controller
//
// Call Query to edit employee the database
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', 'Upload', ($http, $scope, $location, $routeParams, $window, Upload) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.userPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Edit an Employee";
  $scope.office = {};
  $scope.employeeID = $routeParams.id;
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Employee/` + $scope.employeeID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.employee = response.data[0];
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/OfficeOfEmployee/` + $scope.employeeID,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log(response);
      $scope.office = response.data[0];
    }, err => {
      //console.log(err);
    });
  }, err => {
    //console.log(err);
  });
  $scope.isInt = function(value) {
    return !isNaN(value) &&  parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
  };
  // Upload on file select or drop
  $scope.upload = function (file) {
      Upload.upload({
          url: `${env.api.root}/Api/Upload/Image`,
          data: {file: file, employeeID: $scope.employeeID},
          headers: {
            'x-access-token': $window.sessionStorage.token
          }
      }).then(function (response) {
          //console.log('Success ' + response.config.data.file.name + ' uploaded. Response status: ' + response.status);
      }, function (response) {
          //console.log('Error status: ' + response.status);
      }, function (event) {
          //var progressPercentage = parseInt(100.0 * event.loaded / event.total);
          //console.log('progress: ' + progressPercentage + '% ' + event.config.data.file.name);
      });
  };
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/EditEmployee/`+$scope.employeeID,
      data: $scope.employee,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    })
    .then(response => {
      if ($scope.editEmployeeForm.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
      if ($scope.office != undefined && $scope.isInt($scope.office.officeID)) {
        $http({
          method: 'POST',
          url: `${env.api.root}/Api/EditEmployeeUpdatedForOffice/`+ $scope.office.officeID,
          data: {employeeUpdated: 1},
          headers: {
            'x-access-token': $window.sessionStorage.token
          }
        })
        .then(response => {
          $http({
            method: 'POST',
            url: `${env.api.root}/Api/SendEmail`,
            data: {reason: 'employeeUpdate'},
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
          })
          .then(response => {
            $window.location.href = '/view-employees';
          }, err => {
          });
        },err => {
        });
      } else {
        $window.location.href = '/view-employees';
      }
    },err => {
      //console.log(err);
    });
  };
}];
