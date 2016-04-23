import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// View Employees Controller
//
// Show a list of employees
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope.officeID;
  $scope.errorMessage = "";
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "All Employees";
  $scope.add = function() {
    $location.path('/add-employee');
  };
  $scope.upload = function() {
    try {
      var repeatEmail = false;
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

        if (splitted.length % 5 == 0) {
          max = splitted.length;
          while (i < max) {
            var employee = {};
            employee.firstName = splitted[i++];
            employee.lastName = splitted[i++];
            employee.email = splitted[i++];
            employee.password = Math.round((Math.pow(36, 8) - Math.random() * Math.pow(36, 7))).toString(36).slice(1);
            employee.department = splitted[i++];
            employee.title = splitted[i++];
            employee.restroomUsage = 1;
            employee.noisePreference = 1;
            employee.outOfDesk = 1;
            employee.pictureAddress = "";
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
          for (var i in employees) {
            for (var j in $scope.checkEmployees) {
              if (employees[i].email == $scope.checkEmployees[j].email) {
                repeatEmail = true;
              }
            }
          }
          if (repeatEmail == true) {
            alert("Error: CSV contains an email already in database!");
            $window.location.reload();
          } else {
            $http({
              method: 'POST',
              url: `${env.api.root}/Api/AddEmployees`,
              data: {employees: employees, officeID: $scope.officeID },
              headers: {
                'x-access-token': $window.sessionStorage.token
              }
            })
            .then(response => {
              alert("CSV successfully uploaded.");
              $http({
                method: 'GET',
                url: `${env.api.root}/Api/AllEmployeesNotSuperadmin`,
                headers: {
                  'x-access-token': $window.sessionStorage.token
                }
              })
              .then(response => {
                $scope.emps = response.data;
                $window.location.reload();
              }, err => {
                //console.log(err);
              });
            }, err => {
              //console.log(err);
            });
          }
        } else {
          alert("Incorrect csv format.\nThe correct format is firstName,lastName,email,department,email");
        }
      }
      r.readAsText(f);
    } catch (err) {
      $scope.errorMessage = "Please choose both a CSV file and office to upload employees";
    }
  };
  $scope.delete = function(employeeID) {
    if (confirm('Are you sure you want to delete this employee? This cannot be undone.')) {
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/IsEmployeeLastSuperadmin/` + employeeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log(response);
        $scope.isEmployeeLastSuperadmin = response.data[0];
        if ($scope.isEmployeeLastSuperadmin.result === 0) {
          alert('Error: Cannot delete only superadmin');
        } else {
          $http({
            method: 'GET',
            url: `${env.api.root}/Api/DeleteEmployee/` + employeeID,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
          }).then(response => {
            //console.log(response);
            $http({
              method: 'GET',
              url: `${env.api.root}/Api/AllEmployeesNotSuperadmin`,
              headers: {
                'x-access-token': $window.sessionStorage.token
              }
            }).then(response => {
              //console.log(response);
              $scope.emps = response.data;
            }, err => {
              //console.log(err);
            });
          }, err => {
            //console.log(err);
          });
        }
      }, err => {
        //console.log(err);
      });
    }
  };
  $scope.edit = function(employeeID) {
    $location.path('/edit-employee/' + employeeID);
  };
  $scope.view = function(employeeID) {
    $location.path('/employee-detail/' + employeeID);
  };
  $scope.orderProperty='firstName';
  $scope.setOrderProperty = function(propertyName) {
    if ($scope.orderProperty === propertyName) {
      $scope.orderProperty = '-' + propertyName;
    } else if ($scope.orderProperty === '-' + propertyName) {
      $scope.orderProperty = propertyName;
    } else {
      $scope.orderProperty = propertyName;
    }
    return $scope.orderProperty;
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/AllEmployeesNotSuperadmin`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.emps = response.data;
  }, err => {
    //console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/AllEmployees`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.checkEmployees = response.data;
  }, err => {
    //console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/AllOffices`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.offices = response.data;
  }, err => {
    //console.log(err);
  });
}];
