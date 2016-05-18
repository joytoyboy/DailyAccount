/**
 * Created by joytoyboy on 2016/5/10.
 */
angular.module('app.homeFlowCtrl', [])
  .controller('HomeFlowCtrl', ["$scope", '$rootScope', "FlowFact", "$state", '$http','$ionicHistory','$stateParams',
   function($scope, $rootScope, FlowFact, $state, $http,$ionicHistory,$stateParams) {
     $scope.flowItems = FlowFact.requestItems($http, 0, 30);
     if ($stateParams != null && $stateParams.clearHistory){
       $ionicHistory.clearHistory();
     }
     console.log("in HomeFlow");
     console.log($ionicHistory.viewHistory());

     $scope.flowItemTypeMap = {
       '社交': {style: 'app-tag-green'},
       '工资': {style: 'app-tag-red'}
     };

     $scope.addAccount = function () {
       $state.go('home.addAccount');
     }
   }])
;
