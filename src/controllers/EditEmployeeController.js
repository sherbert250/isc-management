import env from '../core/env';
import primaryNavItems from '../settings/primary_nav_items';

//
// Edit Employee Controller
//
// Call Query to edit employee the database
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', 'Upload', ($http, $scope, $location, $routeParams, $window, Upload) => {
  $scope.primaryNavItems = primaryNavItems;
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
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          // Redirect them to their info page
          //$location.path('/my-info');
        } else if (permissionLevel === 'user') {
          if ($routeParams.id != response.data[0].employeeID) {
            $location.path('/my-info');
          }
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
  $scope.header = "Edit an Employee";
  $scope.employeeID = $routeParams.id;
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Employee/` + $scope.employeeID
  }).then(response => {
    //console.log(response);
    $scope.employee = response.data[0];
  }, err => {
    //console.log(err);
  });
  
  // Upload on file select or drop
  $scope.upload = function (file) {
      Upload.upload({
          url: `${env.api.root}/Api/Upload/Image`,
          data: {file: file, employeeID: $scope.employeeID}
      }).then(function (response) {
          console.log('Success ' + response.config.data.file.name + ' uploaded. Response status: ' + response.status);
      }, function (response) {
          console.log('Error status: ' + response.status);
      }, function (event) {
          var progressPercentage = parseInt(100.0 * event.loaded / event.total);
          console.log('progress: ' + progressPercentage + '% ' + event.config.data.file.name);
      });
  };
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/EditEmployee/`+$scope.employeeID,
      data: $scope.employee
    })
    .then(response => {
      if ($scope.editEmployeeForm.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
      //$location.path('/view-employees');
      $http({
        method: 'POST',
        url: `${env.api.root}/Api/SendEmail`,
        data: {reason: 'employeeUpdate'}
      })
      .then(response => {
        $location.path('/view-employees');
      }, err => {
        //console.log(err);
      });
    },err => {
      //console.log(err);
    });
  };
}];
