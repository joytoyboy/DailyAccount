// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','app.appConfig','app.splashCtrl','app.wizardCtrl','app.loginCtrl'])

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

.config(function ($stateProvider, $urlRouterProvider) {
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
          templateUrl: './page/home-flow.html'
          // controller: 'DashCtrl'
        }
      }
    })
    .state('home.stat', {
      url: '/stat',
      views: {
        'home-stat': {
          templateUrl: './page/home-stat.html'
          // controller: 'DashCtrl'
        }
      }
    })
    .state('home.mine', {
      url: '/mine',
      views: {
        'home-mine': {
          templateUrl: './page/home-mine.html'
          // controller: 'DashCtrl'
        }
      }
    })
  ;
  $urlRouterProvider.otherwise('/home/flow');

}).controller("AppCtrl", function ($scope, $state, $ionicNavBarDelegate) {
  $scope.setNavTitle = function(name){
    $ionicNavBarDelegate.title("ddd");
  }
  $scope.hideNavTitle = function () {
    // $ionicNavBarDelegate.showBar(false);
  }

  $scope.flowItemTypeMap = {
    '社交': {style: 'app-tag-green'},
    '工资': {style: 'app-tag-red'}
  }

  $scope.flowItems = [
    { img: 'img/ic_out.png',
      title: '泡妞',
      moneyType: '现金',
      price: '400元',
      type: '社交',
    }
    , { img: 'img/ic_in.png',
      title: '发工资',
      moneyType: '银行卡',
      price: '5000元',
      type: '工资',
    }
    , { img: 'img/ic_in.png',
      title: '发工资',
      moneyType: '银行卡',
      price: '5000元',
      type: '工资',
    }
    , { img: 'img/ic_in.png',
      title: '发工资',
      moneyType: '银行卡',
      price: '5000元',
      type: '工资',
    }
    , { img: 'img/ic_in.png',
      title: '发工资',
      moneyType: '银行卡',
      price: '5000元',
      type: '工资',
    }
  ];

  $scope.share = function (item) {

  };

  $scope.edit = function (item) {

  };

  $scope.reorderItem = function (item, from, to) {

  };

  $state.go('splash');
})

