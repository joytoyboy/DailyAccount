/**
 * Created by joytoyboy on 2016/5/10.
 * 参考了http://www.tuicool.com/articles/2Qbiqi
 */
angular.module('app.addAccountCtrl', [])
  .controller('AddAccountCtrl', ['$scope', '$rootScope', '$state','$stateParams','$ionicHistory', '$http', 'AppConfig',
    'AppConst',
    function($scope, $rootScope, $state,$stateParams,$ionicHistory,$http,AppConfig, AppConst) {
      // if ($stateParams != null && $stateParams.clearHistory){
      //   $ionicHistory.clearHistory();
      // }

      $scope.useArray = [];

      // 获取分类表。
      if (null == $rootScope.appConfig.accountUseList){
        console.log("start request account use list.");
        // $rootScope.requestAccountUse(false);
      }
      $rootScope.requestAccountUse(false); // 暂移至外面来做。

      $scope.typeUseList = []; // $scope.accountData.type对应的uselist。
      $scope.initUseList = function () {
        $scope.typeUseList = [];
        $scope.accountData.use = {};
        if ($rootScope.appConfig.accountUseList != null){
          for (key in $rootScope.appConfig.accountUseList)
          {
            subList = $rootScope.appConfig.accountUseList[key];
            // console.log(subList);
            // console.log($scope.accountData.type);
            // 找到type对应的uselist。
            if (subList.type_id == $scope.accountData.type.id &&
              subList.list != null){
              if (subList.list.length > 0){
                $scope.accountData.use = subList.list[0];
              }
              $scope.typeUseList = subList.list;
              break;
            }
          }
        }
      };

      $scope.reset = function (form) {
        $scope.accountData = {
          type: $rootScope.accountType[1],
          time: new Date(),
          desc: '',
          moneyMode: $rootScope.moneyMode[0],
          use: {},
          amount: ''
        };

        resetForm(form);
      };
      $scope.reset(null);

      // 监听rootScope的数据变化。
      var unWatchUseList = $rootScope.$watch($rootScope.appConfig.accountUseList,function(newValue,oldValue, scope){
        // console.log($rootScope.appConfig);
        $scope.initUseList();
        // 不需监听时可以调用unWatchUseList();
      });

      /** 账目类型改变时，改变分类值*/
      $scope.typeChanged = function () {
        $scope.initUseList();
      };

      $scope.addUse = function () {
        $state.go('addUse', {
          accountType: $scope.accountData.type
        });
      }

      $scope.back = function () {
        $state.goBack();
      }

      // 添加处理。
      $scope.addAccount = function (form) {
        if (!form.$valid) {
          $rootScope.alertError('请输入正确的参数。');
          return;
        }

        var accountData = angular.copy($scope.accountData);
        if (accountData.type == null){
          $rootScope.alertError('请选择正确的账目类型。');
          return;
        }

        if (accountData.moneyMode == null){
          $rootScope.alertError('请选择正确的支付方式。');
          return;
        }

        if (accountData.use == null){
          $rootScope.alertError('请选择正确的用途。');
          return;
        }

        accountData.type = accountData.type.id;
        accountData.moneyMode = accountData.moneyMode.id;
        accountData.time = timeStamp(accountData.time);
        accountData.use = accountData.use.id;
        console.log(accountData);

        $scope.config = {headers: $rootScope.httpHeaders()};
        $scope.url = AppConst.URL + AppConst.ADD_ACCOUNT;
        $http.post($scope.url, accountData, $scope.config)
          .success(function (response) {
            if (response.code != AppConst.CODE_OK){
              $rootScope.alertError(response.message);
            }
            else{
              $rootScope.alertError("添加成功");
              $scope.reset(form);
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
