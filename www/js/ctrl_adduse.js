/**
 * Created by joytoyboy on 2016/5/10.
 * 参考了http://www.tuicool.com/articles/2Qbiqi
 */
angular.module('app.addUseCtrl', [])
  .controller('AddUseCtrl', ['$scope', '$rootScope', '$state','$stateParams','$ionicHistory', '$http', 'AppConfig',
    'AppConst',
    function($scope, $rootScope, $state,$stateParams,$ionicHistory,$http,AppConfig, AppConst) {
      if ($stateParams != null && $stateParams.accountType){
        $scope.curAccountType = $stateParams.accountType;
      }

      $scope.reset = function (form) {
        $scope.useData = {
          type: $scope.curAccountType,
          name: '',
        };

        resetForm(form);
      };
      $scope.reset(null);

      // 添加处理。
      $scope.addUse = function (form) {
        if (!form.$valid) {
          $rootScope.alertError('请输入正确的参数。');
          return;
        }

        var useData = angular.copy($scope.useData);
        if (useData.type == null){
          $rootScope.alertError('请选择正确的账目类型。');
          return;
        }

        useData.type = useData.type.id;

        $scope.config = {headers: $rootScope.httpHeaders()};
        $scope.url = AppConst.URL + AppConst.ADD_USE;
        $http.post($scope.url, useData, $scope.config)
          .success(function (response) {
            if (response.code != AppConst.CODE_OK){
              $rootScope.alertError(response.message);
            }
            else{
              // 保存
              var foundList = null;
              var existKey = null;
              for (key in $rootScope.appConfig.accountUseList){
                var subList = $rootScope.appConfig.accountUseList[key];
                if (subList.type_id == $scope.useData.id){
                  foundList = subList;
                  existKey = key;
                  break;
                }
              }
              if (null == foundList){
                foundList = {
                  type_id: $scope.useData.id
                  ,list: response.data.list
                }
                $rootScope.appConfig.accountUseList.push(foundList);
              }
              else{
                foundList.list = response.data.list;
                $rootScope.appConfig.accountUseList[existKey] = foundList;
              }
              AppConfig.saveConfig($rootScope.appConfig);

              $scope.reset(form);
              $rootScope.alertOK("添加成功");
            }
          })
          .error(function (data) {
            //错误代码
            $rootScope.alertError(data);
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
