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
          firstRun: true
          ,userName: ''
          ,token: ''
          // 账目分类（这一笔是什么用途）
          ,accountUseList: []
        };
      },
      // 保存App配置数据
      saveConfig: function(appConfig) {
        window.localStorage['appConfig'] = angular.toJson(appConfig);
      },

      // 获取账目类型
      getAccountType: function () {
        return [
          { id: 1,
            name: '支出'
          }
          ,{ id: 2,
            name: '收入'
          }
          ,{ id: 3,
            name: '取现'
          }
          ,{ id: 4,
            name: '存现'
          }
          ,{ id: 5,
            name: '借款'
          }
          ,{ id: 6,
            name: '还借款'
          }
          ,{ id: 7,
            name: '放款'
          }
          ,{ id: 8,
            name: '放款收回'
          }
          ]
      }

      // 获取支付类型
      ,getMoneyMode: function () {
        return [
          { id: 1,
            name: '现金'
          }
          ,{ id: 2,
            name: '借记卡'
          }
          ,{ id: 3,
            name: '信用卡'
          }
          ,{ id: 4,
            name: '其它(如支付宝、油卡等）'
          }
        ]
      }
    }
  })
;

