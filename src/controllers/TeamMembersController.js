import teamMembers from '../data/team_members';
import env from '../core/env';

//
// Team Members Controller
//
// Show a list of all team members
//

export default ['$http', '$scope', ($http, $scope) => {
  $scope.collection = teamMembers;
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/AllClusters`
  }).then(response => {
    console.log(response);
  }, err => {
    console.log(err);
  });
}];
