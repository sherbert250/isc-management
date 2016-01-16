import env from '../core/env';

//
// Add Employee Controller
//
// Call Query to add employee to the database
//

export default ['$http', '$scope', '$location', ($http, $scope, $location) => {
  $scope.header = "Add an Employee";
  $scope.employee = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
    title: "",
    restroomUsage: 0,
    noisePreference: 0,
    outOfDesk: 0,
    pictureAddress: "",
    permissionLevel: ""
  };
  $scope.reset = function() {
    $scope.employee = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      department: "",
      title: "",
      restroomUsage: 0,
      noisePreference: 0,
      outOfDesk: 0,
      pictureAddress: "",
      permissionLevel: ""
    };
  };
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/AddEmployee`,
      data: $scope.employee
    })
    .then(function (response) {
      alert('success');
    },function (response) {
      alert('error');
    });
    $location.path('/view-employees');
  };
}];
