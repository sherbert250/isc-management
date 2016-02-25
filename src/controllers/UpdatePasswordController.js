import env from '../core/env';
import primaryNavItems from '../settings/primary_nav_items';

//
// Update Password Controller
//
// Updates password of an employee
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window)  => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.adminAccess = false;
  $scope.passwords={
    oldPassword:"",
    password:"",
    password2:""
  };
  
  if(!$window.sessionStorage.token){
      $location.path('/login');
  } else {
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log(response.data);
      if (response.data.status == 400) {
        delete $window.sessionStorage.token;
        $location.path('/login');
      }
      var permissionLevel = response.data[0].permissionLevel;
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          // Redirect them to their info page
          //$location.path('/my-info');
          $scope.adminAccess = true;
        } else if (permissionLevel === 'user') {
          // Redirect them to their info page
          //$location.path('/my-info');
        } else {
          alert('Invalid permission level');
          $location.path('/')
        }
      } else {
        $scope.adminAccess = true;
        for (var i in $scope.primaryNavItems) {
          $scope.primaryNavItems[i].show = true;
        }
      }
      $scope.collection = response.data;
      $scope.employee = response.data[0];
      $scope.employeeID = $scope.employee.employeeID;
      $scope.header = $scope.employee.firstName + " " + $scope.employee.lastName;
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/EmployeeTemperatureRange/` + $scope.employeeID
      }).then(response => {
        //console.log(response.data);
        $scope.temperatureRange = response.data[0];
      }, err => {
        //console.log(err);
      });
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/OfficeOfEmployee/` + $scope.employeeID
      }).then(response => {
        if ($scope.isEmpty(response.data)) {
          $scope.companyName = "No Company Assigned";
        } else {
          //console.log(response.data);
          $scope.officeID = response.data[0].officeID;
          $http({
            method: 'GET',
            url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID
          }).then(response => {
            if ($scope.isEmpty(response.data)) {
              $scope.companyName = "No Company Assigned";
            } else {
              //console.log(response.data);
              $scope.companyName = response.data[0].companyName
            }
          }, err => {
            //console.log(err);
          });
        }
      }, err => {
        //console.log(err);
      });
    }, err => {
      //console.log(err);
    });
  }
  $scope.passwordMisMatch=false;
  $scope.invalidOldPassword=false;

  $scope.submit = function(employeeID) {
    $scope.passwordMisMatch=false;
    $scope.invalidOldPassword=false;
    //Call API
    $http({
      method : "POST",
      url : `${env.api.root}/Api/UpdatePassword`,
      data: {oldPassword: $scope.passwords.oldPassword, password: $scope.passwords.password, password2: $scope.passwords.password2, employeeID: employeeID.employeeID},
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': $window.sessionStorage.token
      }
    })
    .then(response => {
      if(response.data.message==="Invalid Old Password."){
        $scope.invalidOldPassword=true;
      }
      else if(response.data.message === "New passwords do not match."){
        $scope.passwordMisMatch=true;
      }
      else{
        delete $window.sessionStorage.token;
        console.log("got here")
        $http({
          method : "POST",
          url : `${env.api.root}/Api/SendEmail`,
          data: {reason: "passwordUpdate", email: $scope.employee.email}
        })
        .then(response => {

        }, err => {
          console.log(err.data.message);
        });
        $location.path('/login');
      }
      
    }, err => {
      

    });
  };
}];
