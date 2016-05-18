// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','app.appConfig','app.splashCtrl','app.wizardCtrl','app.loginCtrl'
  , 'app.regCtrl', 'app.homeCtrl', 'app.homeFlowCtrl','app.homeStatCtrl','app.homeMineCtrl','app.addAccountCtrl'
  , 'app.addUseCtrl'
  ,'app.flow'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.constant('AppConst', {
  URL: 'http://mmb.qsc365.com/admin/if/',
  LOGIN: 'login.html',
  REG: 'reg.html',
  ADD_ACCOUNT: 'addaccount.html',
  USELIST: 'uselist.html',
  ADD_USE: 'adduse.html',
  CODE_OK: 1,
  CODE_NOTLOGIN: -1,
})

// 自定义密码检测指令。
// 坑: 在js中使用驼峰命名，在html中使用-分隔符，如checkPwd在html的input中使用为：check-pwd
.directive('checkPwd', [function () {
  return {
    require: "ngModel",
    link: verifyPassword
  };
}])

// 自定义金额检测指令。
.directive('checkMoney', [function () {
  return {
    require: "ngModel",
    link: verifyMoney
  };
}])
  // .directive('hideTabs', function($rootScope) {
  //   return {
  //     restrict: 'A',
  //     link: function(scope, element, attributes) {
  //       scope.$on('$ionicView.beforeEnter', function() {
  //         scope.$watch(attributes.hideTabs, function(value){
  //           $rootScope.hideTabs = value;
  //         });
  //       });
  //
  //       scope.$on('$ionicView.beforeLeave', function() {
  //         $rootScope.hideTabs = false;
  //       });
  //     }
  //   };
  // })
.directive('hideTabs',function($rootScope){
  return {
    restrict:'AE',
    link:function($scope){
      $rootScope.hideTabs = 'tabs-item-hide';
      $scope.$on('$destroy',function(){
        $rootScope.hideTabs = ' ';
      })
    }
  }
})
.config(function ($stateProvider, $urlRouterProvider,$httpProvider) {
  $stateProvider
    .state("splash", {
      url: "/splash.html",
      templateUrl: "./page/splash.html"
    })
    .state("wizard", {
      url: "/wizard.html",
      templateUrl: "./page/wizard.html",
      // 这里定义进入此页后是否将前面的页面清掉，清掉后按回退键就不能进入前一页了。
      params: {'clearHistory': false}
    })
    .state("login", {
      url: "/login.html",
      templateUrl: "./page/login.html",
      // 这里定义进入此页后是否将前面的页面清掉，清掉后按回退键就不能进入前一页了。
      params: {'clearHistory': false}
    })
    .state("reg", {
      url: "/reg.html",
      templateUrl: "./page/reg.html",
      // 这里定义进入此页后是否将前面的页面清掉，清掉后按回退键就不能进入前一页了。
      params: {'clearHistory': false}
    })
    .state("home", {
      'url' : '/home',
      templateUrl: "./page/home.html",
      abstract: true,
      // 这里定义进入此页后是否将前面的页面清掉，清掉后按回退键就不能进入前一页了。
      params: {'clearHistory': false}
    })
    .state('home.flow', {
      // **坑**：这里不能写成`/home/flow`，因为继承关系，会自动转换为`/home/flow`。
      url: '/flow',
      views: {
        'home-flow': {
          templateUrl: './page/home-flow.html',
          controller: 'HomeFlowCtrl'
        }
      },
      params: {'clearHistory': false}
    })
    .state('home.stat', {
      url: '/stat',
      views: {
        'home-stat': {
          templateUrl: './page/home-stat.html',
          controller: 'HomeStatCtrl'
        }
      }
    })
    .state('home.mine', {
      url: '/mine',
      views: {
        'home-mine': {
          templateUrl: './page/home-mine.html',
          controller: 'HomeMineCtrl'
        }
      }
    })
    .state('home.addAccount', {
      url: '/addAccount.html',
      views:{
        'home-flow':{
          templateUrl: './page/addaccount.html',
          controller: 'AddAccountCtrl'
        }
      }
    })
    .state('addUse', {
      url: '/addUse.html',
      templateUrl: './page/adduse.html',
      controller: 'AddUseCtrl',
      params: {'accountType': null}
    })
  ;
  $urlRouterProvider.otherwise('splash');

  httpTransform($httpProvider);
}).controller("AppCtrl", ['$scope', '$rootScope', "AppConfig", '$state', '$ionicNavBarDelegate', '$http','$ionicPopup',
  'AppConst',
  function ($scope, $rootScope, AppConfig, $state, $ionicNavBarDelegate, $http,$ionicPopup, AppConst) {

  $rootScope.appConfig = AppConfig.getConfig();
  $rootScope.accountType = AppConfig.getAccountType();
  $rootScope.moneyMode = AppConfig.getMoneyMode();

  $scope.setNavTitle = function(name){
    // $ionicNavBarDelegate.title("ddd");
  }
  $scope.hideNavTitle = function () {
    // $ionicNavBarDelegate.showBar(false);
  }

  // 向服务器请求分类表。
  $rootScope.requestAccountUse = function (isSilent) {
    if (null == $rootScope.appConfig.token){
      return;
    }

    $scope.config = {headers: $rootScope.httpHeaders()};
    $scope.url = AppConst.URL + AppConst.USELIST;
    $http.post($scope.url, {aa: 0}, $scope.config)
      .success(function (response) {
        if (response.code != AppConst.CODE_OK){
          if (!isSilent){
            $rootScope.alertError(response.message);
          }
        }
        else{
          // 保存起来
          if (response.data.list){
            $rootScope.appConfig.accountUseList = response.data.list;
            AppConfig.saveConfig($rootScope.appConfig);
          }
        }
      })
      .error(function (data) {
        //错误代码
        if (!isSilent){
          $rootScope.alertError(data);
        }
      });
  }

  // 错误提示框
  $rootScope.alertError = function(msg, title) {
    var alertPopup = $ionicPopup.alert({
      title: title==null ? '错误' : title,
      template: msg
    });

    alertPopup.then(function(res) {
      // do nothing.
    });
  };

  // 成功提示框
  $rootScope.alertOK = function(msg) {
    var alertPopup = $ionicPopup.alert({
      title: '成功',
      template: msg
    });
  };

  $rootScope.popupConfirm = function (title, message, cb) {
    var confirmPopup = $ionicPopup.confirm({
      title: title
      , template: message
      , cancelText: '取消'
      , okText: '确定'
    });

    return confirmPopup.then(cb);
  }

  $rootScope.toast = function (message) {
    // $cordovaToast
    //   .show(message, 'long', 'center');
  }

  // 设置请求头。
  $rootScope.httpHeaders = function () {
    return {
      'UUID': '1234',
      'AppVer': '1',
      'OSType': '1',
      'OSVer': '1',
      'token': $rootScope.appConfig.token,
      // 'X-Requested-With': 'XMLHttpRequest',
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      // 'Accept': 'application/json, text/javascript, */*; q=0.01',
    };
  };

  $rootScope.requestAccountUse(true);
  $state.go('splash');
}])

