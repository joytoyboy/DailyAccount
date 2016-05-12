/**
 * Created by joytoyboy on 2016/5/10.
 * 参考了http://www.tuicool.com/articles/2Qbiqi
 */
angular.module('app.loginCtrl', [])
  .controller('LoginCtrl', ['$scope', '$rootScope', '$state','$stateParams','$ionicHistory', '$http', 'AppConfig',
    'AppConst',
    function($scope, $rootScope, $state,$stateParams,$ionicHistory,$http,AppConfig, AppConst) {
      if ($stateParams != null && $stateParams.clearHistory){
        $ionicHistory.clearHistory();
      }

      // 表单数据
      var hasUserName = isUndefined($rootScope.appConfig.userName);

      $scope.reset = function (form) {
        $scope.loginData = {
          name: hasUserName ? '' : $rootScope.appConfig.userName,
          pwd: ''
        };
        resetForm(form);
      };
      $scope.reset(null);

      // 登录处理。
      // 坑：当input验证不通过时，loginData中的相应字段值为null，而不是用户输入的值。
      $scope.login = function (loginForm) {
        console.log($scope.loginData);
        if (!loginForm.$valid) {
          $rootScope.showAlert('请输入正确的参数。');
          return;
        }

        $scope.config = {headers: $rootScope.httpHeaders};
        $scope.url = AppConst.URL + AppConst.LOGIN;
        $http.post($scope.url, $scope.loginData, $scope.config)
          .success(function (response) {
            if (response.code != AppConst.CODE_OK){
              $rootScope.showAlert(response.message);
            }
            else{
              // 将用户名保存起来，下次登录显示。
              if (response.data.name){
                $rootScope.appConfig.userName = response.data.name;
                $rootScope.appConfig.token = response.data.token;
                AppConfig.saveConfig($rootScope.appConfig);
              }

              // 清除密码
              $scope.reset(loginForm);
              goWithoutBack($state, 'home.flow');

              console.log($scope);
            }
          })
          .error(function (data) {
            //错误代码
            $rootScope.showAlert(data);
          });
      }
    }
  ])

  // // 自定义密码检测指令。
  // // 坑: 在js中使用驼峰命名，在html中使用-分隔符，如checkPwd在html的input中使用为：check-pwd
  // .directive('checkPwd', [function () {
  //   return {
  //     require: "ngModel",
  //     link: function (scope, element, attr, ngModel) {
  //       if (ngModel) {
  //         // 只允许字母和数字。
  //         var pwdRegex = /^[A-Za-z0-9]+$/i;
  //       }
  //       var pwdValidator = function (value) {
  //         var validity = ngModel.$isEmpty(value) || pwdRegex.test(value);
  //         ngModel.$setValidity("checkPwd", validity);
  //         return validity ? value : undefined;
  //       };
  //       ngModel.$formatters.push(pwdValidator);
  //       ngModel.$parsers.push(pwdValidator);
  //     }
  //   };
  // }])
;
