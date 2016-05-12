/**
 * Created by joytoyboy on 2016/5/10.
 */
angular.module('app.appConfig', [])
  .factory('AppConfig', function(){
    return {
      // 获取App配置数据
      getConfig: function() {
        var appConfig = window.localStorage['appConfig'];
        if(appConfig) {
          return angular.fromJson(appConfig);
        }

        return {
          firstRun: true,
        };
      },
      // 保存App配置数据
      saveConfig: function(appConfig) {
        window.localStorage['appConfig'] = angular.toJson(appConfig);
      }
    }
  })
;

