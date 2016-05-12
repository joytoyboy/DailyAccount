/**
 * Created by joytoyboy on 2016/5/10.
 */
angular.module('app.homeFlowCtrl', [])
  .controller('HomeFlowCtrl', ["$scope", '$rootScope', "FlowFact", "$state", '$http',
   function($scope, $rootScope, FlowFact, $state, $http) {
     $scope.flowItems = FlowFact.requestItems($http, 0, 30);

     $scope.flowItemTypeMap = {
       '社交': {style: 'app-tag-green'},
       '工资': {style: 'app-tag-red'}
     }
   }])
;
