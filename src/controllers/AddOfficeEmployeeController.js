import env from '../core/env';
import primaryNavItems from '../settings/primary_nav_items';
//
// Add Office Controller
//
// Call Query to add office to the database
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
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
          // Redirect them to their info page
          $location.path('/my-info');
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
  };
  $scope.employee = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
    title: "",
    noisePreference: 1,
    outOfDesk: 1,
    restroomUsage: 1,
    pictureAddress: "",
    permissioneLevel: "",
    officeID: $routeParams.id
  };
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/Office/` + $scope.employee.officeID
  }).then(response => {
    //console.log('Response: ', response.data);
    $scope.employee.officeID = response.data[0].officeID;
    $scope.header = "Add an Employee to " + response.data[0].officeName;
  }).then(err => {
    //console.log('Error: ', err);
  });
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/AddOfficeEmployee`,
      data: $scope.employee
    })
    .then(response => {
      $location.path('/office-detail/' + $scope.employee.officeID);
    }, err => {
      //console.log(err);
    });
  };
}];
