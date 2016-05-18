/**
 * Created by joytoyboy on 2016/5/10.
 */
angular.module('app.wizardCtrl', [])
  .controller('WizardCtrl', ["$scope", "$state",'$stateParams','$ionicHistory',
    function($scope, $state,$stateParams,$ionicHistory) {
    $scope.slideOptions = {
      loop: false,
      speed: 500
    }

    $scope.slideData = {};
    $scope.$watch('slideData.slider', function(nv, ov) {
      $scope.slider = $scope.slideData.slider;
    });

    if ($stateParams != null && $stateParams.clearHistory){
      $ionicHistory.clearHistory();
    }

    $scope.nextPage = function () {
      $state.go('login', {
        clearHistory: true
      });
    }
  }
  ])
;
