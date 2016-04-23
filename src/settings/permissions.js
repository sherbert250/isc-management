import env from '../core/env';

exports.superadminPermissionCheck = function($http, $scope, $location, $window) {

  // Handle Permissions
  if(!$window.sessionStorage.token){
      $location.path('/login');
  } else {
    // Validate the token
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log('Response: ', response.data[0]);
      // Cookie has expired
      if (response.data.status == 400) {
        delete $window.sessionStorage.token;
        $location.path('/login');
      }
      var permissionLevel = response.data[0].permissionLevel;
      $scope.masterID = response.data[0].employeeID;

      // Perform sanity checks for set-up
      $http({
        method: 'GET',
        url : `${env.api.root}/Api/ExistsCompany`,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log('Response: ', response.data[0]);
        if (response.data[0].result == 0) {
          $window.location.href = '/add-initial-company';
        } else {
          $http({
            method: 'GET',
            url : `${env.api.root}/Api/ExistsOffice`,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
          }).then(response => {
            //console.log('Response: ', response.data);
            if (response.data[0].result == 0) {
              $window.location.href = '/add-initial-office/' + $scope.masterID;
            } else {
              $http({
                method: 'GET',
                url : `${env.api.root}/Api/ExistsTemperatureRange`,
                headers: {
                  'x-access-token': $window.sessionStorage.token
                }
              }).then(response => {
                //console.log('Response: ', response.data);
                if (response.data[0].result == 0) {
                  $window.location.href = '/add-initial-temperature-range';
                }
              }).then(err => {
                //console.log('Error: ', err);
              });
            }
          }).then(err => {
            //console.log('Error: ', err);
          });
        }
      }).then(err => {
        //console.log('Error: ', err);
      });

      // Permission Level
      $scope.showAccountInfo.show = true;
      for (var i in $scope.accountNavItems) {
        $scope.accountNavItems[i].show = true;
      }
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          // Redirect them to their info page
          $window.history.back();
        } else if (permissionLevel === 'user') {
          // Redirect them to their info page
          $window.history.back();
        } else {
          alert('Invalid permission level');
          $location.path('/')
        }
      } else {
        $scope.controlCompanies = true;
        for (var i in $scope.primaryNavItems) {
          $scope.primaryNavItems[i].show = true;
        }
      }
    }).then(err => {
      //console.log('Error: ', err);
    });
  }
  return $scope;
};

exports.adminPermissionCheck = function($http, $scope, $location, $window) {
  // Handle Permissions
  if(!$window.sessionStorage.token){
      $location.path('/login');
  } else {
    // Validate the token
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log('Response: ', response.data[0]);
      // Cookie has expired
      if (response.data.status == 400) {
        delete $window.sessionStorage.token;
        $location.path('/login');
      }
      var permissionLevel = response.data[0].permissionLevel;
      $scope.masterID = response.data[0].employeeID;

      // Perform sanity checks for set-up
      $http({
        method: 'GET',
        url : `${env.api.root}/Api/ExistsCompany`,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log('Response: ', response.data[0]);
        if (response.data[0].result == 0) {
          $window.location.href = '/add-initial-company';
        } else {
          $http({
            method: 'GET',
            url : `${env.api.root}/Api/ExistsOffice`,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
          }).then(response => {
            //console.log('Response: ', response.data);
            if (response.data[0].result == 0) {
              $window.location.href = '/add-initial-office/' + $scope.masterID;
            } else {
              $http({
                method: 'GET',
                url : `${env.api.root}/Api/ExistsTemperatureRange`,
                headers: {
                  'x-access-token': $window.sessionStorage.token
                }
              }).then(response => {
                //console.log('Response: ', response.data);
                if (response.data[0].result == 0) {
                  $window.location.href = '/add-initial-temperature-range';
                }
              }).then(err => {
                //console.log('Error: ', err);
              });
            }
          }).then(err => {
            //console.log('Error: ', err);
          });
        }
      }).then(err => {
        //console.log('Error: ', err);
      });

      // Permission Level
      $scope.showAccountInfo.show = true;
      for (var i in $scope.accountNavItems) {
        $scope.accountNavItems[i].show = true;
      }
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          // Redirect them to their info page
          //$location.path('/my-info');
          for (var i in $scope.primaryNavItems) {
            if ($scope.primaryNavItems[i].text == "Offices" || $scope.primaryNavItems[i].text == "Temperature Ranges") {
              $scope.primaryNavItems[i].show = true;
            }
          }
        } else if (permissionLevel === 'user') {
          // Redirect them to their info page
          $window.history.back();
        } else {
          alert('Invalid permission level');
          $location.path('/')
        }
      } else {
        for (var i in $scope.primaryNavItems) {
          $scope.primaryNavItems[i].show = true;
        }
      }
    }).then(err => {
      //console.log('Error: ', err);
    });
  }
  return $scope;
};

exports.userPermissionCheck = function($http, $scope, $location, $window) {

  // Handle Permissions
  if(!$window.sessionStorage.token){
      $location.path('/login');
  } else {
    // Validate the token
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log('Response: ', response.data[0]);
      // Cookie has expired
      if (response.data.status == 400) {
        delete $window.sessionStorage.token;
        $location.path('/login');
      }
      var permissionLevel = response.data[0].permissionLevel;
      $scope.masterID = response.data[0].employeeID;

      // Perform sanity checks for set-up
      $http({
        method: 'GET',
        url : `${env.api.root}/Api/ExistsCompany`,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log('Response: ', response.data[0]);
        if (response.data[0].result == 0) {
          $window.location.href = '/add-initial-company';
        } else {
          $http({
            method: 'GET',
            url : `${env.api.root}/Api/ExistsOffice`,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
          }).then(response => {
            //console.log('Response: ', response.data);
            if (response.data[0].result == 0) {
              $window.location.href = '/add-initial-office/' + $scope.masterID;
            } else {
              $http({
                method: 'GET',
                url : `${env.api.root}/Api/ExistsTemperatureRange`,
                headers: {
                  'x-access-token': $window.sessionStorage.token
                }
              }).then(response => {
                //console.log('Response: ', response.data);
                if (response.data[0].result == 0) {
                  $window.location.href = '/add-initial-temperature-range';
                }
              }).then(err => {
                //console.log('Error: ', err);
              });
            }
          }).then(err => {
            //console.log('Error: ', err);
          });
        }
      }).then(err => {
        //console.log('Error: ', err);
      });

      // Permission Level
      $scope.showAccountInfo.show = true;
      for (var i in $scope.accountNavItems) {
        $scope.accountNavItems[i].show = true;
      }
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          // Redirect them to their info page
          //$location.path('/my-info');
          $scope.canEdit = true;
          $scope.adminAccess = true;
          $scope.canReassign = false;
          for (var i in $scope.primaryNavItems) {
            if ($scope.primaryNavItems[i].text == "Offices" || $scope.primaryNavItems[i].text == "Temperature Ranges") {
              $scope.primaryNavItems[i].show = true;
            }
          }
        } else if (permissionLevel === 'user') {
          // Redirect them to their info page
          //$location.path('/my-info');
          if ($scope.employeeID == response.data[0].employeeID) {
            $scope.canEdit = true;
          }
        } else {
          alert('Invalid permission level');
          $location.path('/')
        }
      } else {
        $scope.adminAccess = true;
        $scope.canEdit = true;
        $scope.canReassign = true
        for (var i in $scope.primaryNavItems) {
          $scope.primaryNavItems[i].show = true;
        }
      }
    }).then(err => {
      //console.log('Error: ', err);
    });
  }
  return $scope;
};
