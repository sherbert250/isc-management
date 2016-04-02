import env from '../../core/env';
import primaryNavItems from '../../settings/primary_nav_items';
import accountNavItems from '../../settings/account_nav_items';
import showAccountInfo from '../../settings/account_info';

//
// Add Super Admin to Office Controller
//
// Call Query to add Super Admin to Office
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope.showAccountInfo.show = false;
  for (var i in $scope.primaryNavItems) {
      $scope.primaryNavItems[i].show = false;
  }
  for (var i in $scope.accountNavItems) {
    $scope.accountNavItems[i].show = false;
  }
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
      $scope.employeeID = response.data[0].employeeID;
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          $location.path('/initialization-error');
        } else if (permissionLevel === 'user') {
          $location.path('/initialization-error');
        } else {
          alert('Invalid permission level');
          $location.path('/')
        }
      } else {
        $http({
          method: 'GET',
          url : `${env.api.root}/Api/ExistsSuperadminWithOffice`
        }).then(response => {
          //console.log('Response: ', response.data);
          if (response.data[0].result == 1) {
            $window.location.href = '/my-info';
          }
        }).then(err => {
          //console.log('Error: ', err);
        });
      }
      $http({
        method: 'GET',
        url : `${env.api.root}/Api/Employee/` + $scope.employeeID
      }).then(response => {
        //console.log('Response: ', response.data);
        $scope.employee = response.data[0];
        $scope.header = "Add a Superadmin " + $scope.employee.firstName + " " + $scope.employee.lastName + " to Office";
      }).then(err => {
        //console.log('Error: ', err);
      });
    }).then(err => {
      //console.log('Error: ', err);
    });
  }
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/AllOffices`
  }).then(response => {
    //console.log('Response: ', response.data);
    $scope.offices = response.data;
  }).then(err => {
    //console.log('Error: ', err);
  });
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/AddEmployeeToOffice`,
      data: {employeeID: $scope.employeeID, officeID : $scope.officeID}
    })
    .then(response => {
      $window.location.href = '/my-info';
    }, err => {
      //console.log(err);
    });
  };
}];
