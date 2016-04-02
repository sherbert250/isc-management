import env from '../../core/env';
import primaryNavItems from '../../settings/primary_nav_items';
import accountNavItems from '../../settings/account_nav_items';
import showAccountInfo from '../../settings/account_info';
import states from '../../settings/states';

//
// Add Initial Office Controller
//
// Call Query to add initial office to the database
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope.showAccountInfo.show = false;
  $scope.states = states;
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
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          // Redirect them to their info page
          //$location.path('/my-info');
        } else if (permissionLevel === 'user') {
          // A Super admin needs to set-up the application
          $location.path('/initialization-error');
        } else {
          alert('Invalid permission level');
          $location.path('/')
        }
      } else {
        $http({
          method: 'GET',
          url : `${env.api.root}/Api/ExistsOffice`
        }).then(response => {
          //console.log('Response: ', response.data);
          if (response.data[0].result == 1) {
            $http({
              method: 'GET',
              url : `${env.api.root}/Api/ExistsTemperatureRange`
            }).then(response => {
              //console.log('Response: ', response.data);
              if (response.data[0].result == 0) {
                $window.location.href = '/add-initial-temperature-range';
              }
            }).then(err => {
              //console.log('Error: ', err);
            });
            $http({
              method: 'GET',
              url : `${env.api.root}/Api/ExistsSuperadminWithOffice`
            }).then(response => {
              //console.log('Response: ', response.data);
              if (response.data[0].result == 0) {
                $window.location.href = '/add-superadmin-to-office';
              } else {
                $location.path('/my-info');
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
  }
  $scope.header = "Add an Office";
  $scope.office = {
    officeName: "",
    officePhoneNumber: "",
    officeEmail: "",
    officeStreetAddress: "",
    officeCity: "",
    officeState: "",
    officeZipcode: "",
    employeeID: $scope.employeeID
  };
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/AllCompanies`
  }).then(response => {
    //console.log('Response: ', response.data);
    $scope.companies = response.data;
  }).then(err => {
    //console.log('Error: ', err);
  });
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/AddInitialOfficeWithEmployee`,
      data: $scope.office
    })
    .then(response => {
      $http({
        method: 'GET',
        url : `${env.api.root}/Api/ExistsTemperatureRange`
      }).then(response => {
        //console.log('Response: ', response.data);
        if (response.data[0].result == 0) {
          $window.location.href = '/add-initial-temperature-range';
        } else {
          $window.location.href = '/offices';
        }
      }).then(err => {
        //console.log('Error: ', err);
      });
    }, err => {
      //console.log(err);
    });
  };
}];
