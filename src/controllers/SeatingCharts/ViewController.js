import env from '../../core/env';
import _ from 'lodash';
import {createMessage, log} from '../_common';
import {initScopeUserAccess} from './_shared';

//
// Floor Plans (Views) Controller
//
// Display the seating chart
//

export default ['$scope', '$http', '$location', '$routeParams', '$window', ($scope, $http, $location, $routeParams, $window) => {
  // set up the $scope object with nav settings,
  //  routes, api endpoints, and check permissions
  initScopeUserAccess($scope, $http, $location, $window);

  // Check to see if the logged in employee can properly access this seating chart
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/Verify`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    // Get the employee
    var employee = response.data[0];
    //console.log('Got employee',employee);
    if (employee.permissionLevel == 'user') {
      $http({
        method: 'GET',
        url : `${env.api.root}/Api/OfficeOfEmployee/` + employee.employeeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        var office = response.data[0];
        //console.log('Got office',office);
        $http({
          method: 'GET',
          url : `${env.api.root}/Api/ActiveSeatingChartOfOffice/` + office.officeID,
          headers: {
            'x-access-token': $window.sessionStorage.token
          }
        }).then(response => {
          //console.log('Got active seating chart', response.data);
          if ($scope.isEmpty(response.data)) {
            $window.history.back();
          } else if (response.data[0].id_seating_chart != $routeParams.id) {
            $window.history.back();
          }
        }, err => {
        });
      }, err => {
      });
    } else if (employee.permissionLevel == 'admin') {
      $http({
        method: 'GET',
        url : `${env.api.root}/Api/CompaniesForAdmin/` + employee.employeeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        var company = response.data[0];
        //console.log('Got company', company);
        $http({
          method: 'GET',
          url : `${env.api.root}/Api/CompanyOffices/` + company.companyID,
          headers: {
            'x-access-token': $window.sessionStorage.token
          }
        }).then(response => {
          //console.log('Company offices', response.data);
          var offices = response.data;
          $http({
            method: 'GET',
            url : `${env.api.root}/Api/SeatingCharts/` + $routeParams.id,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
          }).then(response => {
            //console.log('Seating Chart', response.data);
            var seatingChart = response.data[0];
            var validate = false;
            for (var j in offices) {
              if (seatingChart.office_id == offices[j].officeID) {
                validate = true;
              }
            }
            if (validate == false) {;
              $window.history.back();
            }
          }, err => {
          });
        }, err => {
        });
      });
    }
  }, err => {
  });

  // get the id from url params
  const id = $routeParams.id;
  // fetch the seating chart
  $scope.api.fetchSeatingChart(id, function(err, response) {
    if (err) {
      return log(err);
    }
    // add seating charts to scope
    const matchingRecords = response.data;
    if (matchingRecords.length === 0) {
      return $scope.goToList();
    }
    $scope.seatingChart = response.data[0];

    // fetch the office employees
    $scope.api.fetchOfficeEmployees($scope.seatingChart.office_id, function (err, result) {
      if (err) {
        return log(err);
      } else {
        var seating_chart_JSON = $scope.seatingChart.seating_chart ? JSON.parse($scope.seatingChart.seating_chart) : [];
        $scope.officeEmployees = result.data;
        for (var i in seating_chart_JSON) {
          for (var j in seating_chart_JSON[i]) {
            for (var k = 0; k < $scope.officeEmployees.length; k++) {
              if ($scope.officeEmployees[k].employeeID == seating_chart_JSON[i][j].userId) {
                seating_chart_JSON[i][j].userName = $scope.officeEmployees[k].firstName + ' ' + $scope.officeEmployees[k].lastName;
              }
            }
          }
        }
      }

      //
      // To do: put seating_chart_JSON into spots and have the seating chart application read the attribute name instead of the userID
      //

      //
      // Now, load everything we need for React app
      //

      // add global data
      $window.ISC = {
        initialState: {
          design: {
            cols: $scope.seatingChart.base_floor_plan_cols,
            name: $scope.seatingChart.name,
            rows: $scope.seatingChart.base_floor_plan_rows,
            spots: $scope.seatingChart.seating_chart ? seating_chart_JSON: $scope.seatingChart.base_floor_plan ? JSON.parse($scope.seatingChart.base_floor_plan) : undefined
          },
          settings: {
            readOnly: true
          }
        },
        onExit() {
          window.location.replace(window.location.origin + '/seating-charts');
          // $window.history.back();
        }
      };

      $scope.addCssToHead([
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css'
      ]);

      // add materialize js
      var materializeTag = document.createElement('script');
      materializeTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js';
      document.body.appendChild(materializeTag);

      // add bundle after materializeTag
      materializeTag.onload = function() {
        var bundleTag = document.createElement('script');
        bundleTag.src = '/js/designer.js';
        document.body.appendChild(bundleTag);
      };
    });
  });
}];
