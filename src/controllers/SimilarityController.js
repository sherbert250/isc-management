import env from '../core/env';
import primaryNavItems from '../settings/primary_nav_items';


export default ['$scope','$http', '$location','$window', ($scope, $http, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
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

  function pluckByID(inArr, ID)
  {
    for (var i = 0; i < inArr.length; i++ )
    {
      if (inArr[i].employeeID === ID)
      {
        return true;
      }
    }
    return false;
  };


  function callTeam(ID){
    return $http({
      method: 'GET',
      url: `${env.api.root}/Api/EmployeeTeammates/` + ID
    }).then(response => {
      //console.log(response.data);
      return response.data;
    }, err => {
      //console.log(err);
    });
  }

  function callBlackList(ID){
    return $http({
      method: 'GET',
      url: `${env.api.root}/Api/EmployeeBlacklist/` + ID
    }).then(response => {
      //console.log(response);
      return response.data;
    }, err => {
      //console.log(err);
    });
  }
  
  function callWhiteList(ID){
    return $http({
      method: 'GET',
      url: `${env.api.root}/Api/EmployeeWhitelist/` + ID
    }).then(response => {
      //console.log(response);
      return response.data;
    }, err => {
      //console.log(err);
    });
  }

  function saveToPc(data, filename) {

    if (!data) {
      console.error('No data');
      return;
    }

    if (!filename) {
      filename = 'download.json';
    }

    if (typeof data === 'object') {
      data = JSON.stringify(data, undefined, 2);
    }

    var blob = new Blob([data], {type: 'text/json'}),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    e.initEvent('click', true, false, window,
        0, 0, 0, 0, 0, false, false, false, false, 0, null);
a.dispatchEvent(e);
};

$scope.emps;

$scope.pairs=[];

var pairScores=[];



$http({
  method: 'GET',
  url: `${env.api.root}/Api/AllEmployees`
}).then(response => {
      //console.log(response);
      $scope.emps = response.data;

      var total=($scope.emps.length * ($scope.emps.length -1))/2;

      angular.forEach($scope.emps, function(emp1, key){
        angular.forEach($scope.emps, function(emp2, key){
          if(emp1.employeeID===emp2.employeeID){

          }
          else{
            var score=0;
            var currentPair1='('+emp1.employeeID+','+emp2.employeeID+')';
            var currentPair2='('+emp2.employeeID+','+emp1.employeeID+')';

            if($scope.pairs.indexOf(currentPair1) === -1 && $scope.pairs.indexOf(currentPair2) === -1){
              $scope.pairs.push(currentPair1);
              //
              //Restroom usage
              //
              score+=10-Math.abs(emp1.restroomUsage-emp1.restroomUsage);

              //
              //Noise 
              //
              score+=10-Math.abs(emp1.noisePreference-emp2.noisePreference);

              //
              //Out of Desk
              //
              score+=10-Math.abs(emp1.outOfDesk-emp2.outOfDesk);


              //
              //Checking to see if team mates
              //
              var emp1Team=callTeam(emp1.employeeID);

              emp1Team.then(function(result){
                emp1Team=result;
              });

              var emp2Team=callTeam(emp2.employeeID);

              emp2Team.then(function(result){
                emp2Team=result;
                if(pluckByID(emp1Team, emp2.employeeID) || pluckByID(emp2Team, emp1.employeeID)){
                  score+=7;
                }
                if(emp1.employeeID===1){
                  //console.log("After Team: "+score);
                }
              });

              //
              //Checking if on blacklist
              //
              var emp1BlackList=callBlackList(emp1.employeeID);

              emp1BlackList.then(function(result){
                emp1BlackList=result;
              });

              var emp2BlackList=callBlackList(emp2.employeeID);

              emp2BlackList.then(function(result){
                emp2BlackList=result;
                if(pluckByID(emp1BlackList, emp2.employeeID) || pluckByID(emp2BlackList, emp1.employeeID)){
                  score-=5;
                }
                if(emp1.employeeID===1){
                  //console.log("After BL: "+score);
                }
              });

              //
              //Checking if on whitelist
              //
              var emp1WhiteList=callWhiteList(emp1.employeeID);

              emp1WhiteList.then(function(result){
                emp1WhiteList=result;
              });

              var emp2WhiteList=callWhiteList(emp2.employeeID);

              emp2WhiteList.then(function(result){
                emp2WhiteList=result;
                if(pluckByID(emp1WhiteList, emp2.employeeID) || pluckByID(emp2WhiteList, emp1.employeeID)){
                  $scope.score+=6
                }
                if(emp1.employeeID===1){
                  //console.log("Total Score: "+score);
                }
                var pushing={emp1: emp1.employeeID,
                  emp2: emp2.employeeID,
                  score: score};
                pairScores.push(pushing);
                if(pairScores.length === total){
                  console.log(pairScores);
                  saveToPc(pairScores);
                }
                });

            }
          }
        });
});

console.log(pairScores);



}, err => {
      //console.log(err);
    });

}];