/**
 * Created by joytoyboy on 2016/5/10.
 */
angular.module('app.splashCtrl', [])
  .controller('SplashCtrl', ["$scope", "AppConfig", "$timeout", "$state", function($scope, AppConfig, $timeout, $state) {
    $scope.appConfig = AppConfig.getConfig();
    $scope.getFirstRun = function () {
      if (null == $scope.appConfig){
        return true;
      }

      return $scope.appConfig.firstRun;
    };

    $scope.isFirstRun = $scope.getFirstRun();

    // 将firstRun改为false，保存到本地。
    $scope.appConfig.firstRun = false;
    AppConfig.saveConfig($scope.appConfig);

    // 3秒钟后跳转到wizard页
    $timeout(function(){
      // 如果第一次运行跳转至wizard页，否则跳转至login页。
      // 参见https://github.com/angular-ui/ui-router/wiki
      // $state.go($scope.isFirstRun ? 'wizard' : 'login');
      $state.go('wizard', {
        clearHistory: true
      });
    }, 3000);
  }
  ])
;
