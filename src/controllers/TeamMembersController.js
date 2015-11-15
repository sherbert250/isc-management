import teamMembers from '../data/team_members';

//
// Team Members Controller
//
// Show a list of all team members
//

export default ['$scope', ($scope) => {
  $scope.collection = teamMembers;
}];
