import env from '../core/env';
import primaryNavItems from '../settings/primary_nav_items';

//
// View Employees Controller
//
// Show a list of employees
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.officeID;
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
        url : `${env.api.root}/Api/ExistsCompany`
      }).then(response => {
        //console.log('Response: ', response.data[0]);
        if (response.data[0].result == 0) {
          $window.location.href = '/add-initial-company';
        } else {
          $http({
            method: 'GET',
            url : `${env.api.root}/Api/ExistsOffice`
          }).then(response => {
            //console.log('Response: ', response.data);
            if (response.data[0].result == 0) {
              $window.location.href = '/add-initial-office/' + $scope.masterID;
            } else {
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
      if (permissionLevel !== 'superadmin') {
        if (permissionLevel === 'admin') {
          // Redirect them to their info page
          $location.path('/my-info');
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
  }
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/AllEmployees`
  }).then(response => {
    //console.log(response);
    $scope.emps = response.data;
  }, err => {
    //console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/AllOffices`
  }).then(response => {
    //console.log(response);
    $scope.offices = response.data;
  }, err => {
    //console.log(err);
  });
  $scope.header = "All Employees";
  $scope.add = function() {
    $location.path('/add-employee');
  };
  $scope.upload = function() {
    var f = document.getElementById('csv-upload').files[0],
    r = new FileReader();
    r.onloadend = function(e){
      var data = e.target.result;
      var employees = [];
      data = data.trim();
      data = data.replace(/(?:\r\n|\r|\n)/g, ",");
      var splitted = data.split(",");
      var i = 0;
      var max = 0;

      if (splitted.length % 3 == 0) {
        max = splitted.length;
        while (i < max) {
          var employee = {};
          employee.firstName = splitted[i++];
          employee.lastName = splitted[i++];
          employee.email = splitted[i++];
          employee.password = "randompassword";
          employee.department = "no department";
          employee.title = "no title";
          employee.restroomUsage = 1;
          employee.noisePreference = 1;
          employee.outOfDesk = 1;
          employee.pictureAddress = "no picture address";
          employee.permissionLevel = "user";
          employees.push(employee);
        }
      /*if (splitted.length % 11 == 0) {
        max = splitted.length;
        while (i < max) {
          var employee = {};
          employee.firstName = splitted[i++];
          employee.lastName = splitted[i++];
          employee.email = splitted[i++];
          employee.password = splitted[i++];
          employee.department = splitted[i++];
          employee.title = splitted[i++];
          employee.restroomUsage = splitted[i++];
          employee.noisePreference = splitted[i++];
          employee.outOfDesk = splitted[i++];
          employee.pictureAddress = splitted[i++];
          employee.permissionLevel = splitted[i++];
          employees.push(employee);
        }*/
        $scope.officeID = parseInt($scope.officeID);
        console.log($scope.officeID);
        $http({
          method: 'POST',
          url: `${env.api.root}/Api/AddEmployees`,
          data: {employees: employees, officeID: $scope.officeID }
        })
        .then(response => {
          alert("CSV successfully uploaded.");
          $http({
            method: 'GET',
            url: `${env.api.root}/Api/AllEmployees`,
          })
          .then(response => {
            $scope.emps = response.data;
          }, err => {
            //console.log(err);
          });
        }, err => {
          //console.log(err);
        });

      } else {
        alert("Incorrect csv format.\nThe correct format is firstName,lastName,email");
      }
    }
    r.readAsText(f);
  };
  $scope.delete = function(employeeID) {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/DeleteEmployee/` + employeeID
    }).then(response => {
      //console.log(response);
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/AllEmployees`
      }).then(response => {
        //console.log(response);
        $scope.emps = response.data;
      }, err => {
        //console.log(err);
      });
    }, err => {
      //console.log(err);
    });
  };
  $scope.edit = function(employeeID) {
    $location.path('/edit-employee/' + employeeID);
  };
  $scope.view = function(employeeID) {
    $location.path('/employee-detail/' + employeeID);
  };
}];
