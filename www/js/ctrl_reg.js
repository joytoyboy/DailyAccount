/**
 * Created by joytoyboy on 2016/5/10.
 * 参考了http://www.tuicool.com/articles/2Qbiqi
 */
angular.module('app.regCtrl', [])
  .controller('RegCtrl', ['$scope', '$rootScope', '$state','$stateParams','$ionicHistory', '$http',
    'AppConst',
    function($scope, $rootScope, $state,$stateParams,$ionicHistory,$http,AppConst) {
      if ($stateParams != null && $stateParams.clearHistory){
        $ionicHistory.clearHistory();
      }

      // 表单数据

      $scope.reset = function (form) {
        $scope.regData = {
          name: '', // 用户名
          pwd: '',   // 密码
          pwd2: '',   // 第二次输入的密码
          nickname: '' // 昵称
        };
        resetForm(form);
      }

      $scope.reset(null);

      // 注册处理。
      $scope.reg = function (regForm) {
        if (!regForm.$valid) {
          $rootScope.alertError('请输入正确的参数。');
          return;
        }
        if ($scope.regData.pwd !== $scope.regData.pwd2){
          $rootScope.alertError('两次输入的密码不一致。');
          return;
        }

        $scope.config = {headers: $rootScope.httpHeaders()};
        $scope.url = AppConst.URL + AppConst.REG;
        console.log($scope.regData);
        $http.post($scope.url, $scope.regData, $scope.config)
          .success(function (response) {
            if (response.code != AppConst.CODE_OK){
              console.log($scope.regData);
              $rootScope.alertError(response.message);
            }
            else{
              $scope.reset(regForm);
              goWithoutBack($state, 'login');
            }
          })
          .error(function (data) {
            //错误代码
            $rootScope.alertError(data);
          });
      }
    }
  ])
  .directive('checkPwdMatch', [function () {
    return {
      restrict: 'A',
      require: "ngModel",
      link: verifyPasswordMatch
    };
  }])

;
