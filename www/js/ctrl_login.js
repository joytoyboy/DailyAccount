/**
 * Created by joytoyboy on 2016/5/10.
 * http://www.tuicool.com/articles/2Qbiqi
 */
angular.module('app.loginCtrl', [])
  .controller('LoginCtrl', ['$scope', '$state','$stateParams','$ionicHistory','$ionicPopup',
    function($scope, $state,$stateParams,$ionicHistory,$ionicPopup) {
      if ($stateParams != null && $stateParams.clearHistory){
        $ionicHistory.clearHistory();
      }

      // 表单数据
      $scope.loginData = {
        userName: '',
        pwd: ''
      };

      // An alert dialog
      $scope.showAlert = function(msg) {
        var alertPopup = $ionicPopup.alert({
          title: '错误',
          template: msg
        });

        alertPopup.then(function(res) {
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      };

      // 登录处理。
      // 坑：当input验证不通过时，loginData中的相应字段值为null，而不是用户输入的值。。
      $scope.login = function (valid) {
        console.log($scope.loginData);
        if (!valid){
          $scope.showAlert('请输入正确的参数');
          return;
        }
      }
    }
  ])
  // 坑: 在js中使用驼峰命名，在html中使用-分隔符，如checkPwd在html的input中使用为：check-pwd
  // 定义密码检测
  .directive('checkPwd', [function () {
    return {
      require: "ngModel",
      link: function (scope, element, attr, ngModel) {
        if (ngModel) {
          var pwdRegex = /^[A-Za-z0-9]+$/i;
        }
        var customValidator = function (value) {
          var validity = ngModel.$isEmpty(value) || pwdRegex.test(value);
          // validity = false;
          ngModel.$setValidity("checkPwd", validity);
          return validity ? value : undefined;
        };
        ngModel.$formatters.push(customValidator);
        ngModel.$parsers.push(customValidator);
      }
    };
  }])
;
