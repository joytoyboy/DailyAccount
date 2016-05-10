/**
 * Created by joytoyboy on 2016/5/10.
 */
angular.module('app.loginCtrl', [])
  .controller('LoginCtrl', ['$scope', '$state','$stateParams','$ionicHistory',
    function($scope, $state,$stateParams,$ionicHistory) {
    if ($stateParams != null && $stateParams.clearHistory){
      $ionicHistory.clearHistory();
    }
  }
  ])
;
