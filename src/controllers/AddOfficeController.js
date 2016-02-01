import env from '../core/env';

//
// Add Employee Controller
//
// Call Query to add employee to the database
//

export default ['$http', '$scope', '$location', ($http, $scope, $location) => {
  $scope.header = "Add an Office";
  $scope.office = {
    officeName: "",
    officePhoneNumber: "",
    officeEmail: "",
    officeStreetAddress: "",
    officeCity: "",
    officeState: "",
    officeZipcode: ""
  };
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/AddOffice`,
      data: $scope.office
    })
    .then(response => {
      $location.path('/offices');
    }, err => {
      alert('Error');
    });
  };
}];
