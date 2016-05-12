/**
 * Created by joytoyboy on 2016/5/10.
 */
angular.module('app.flow', [])
  .factory('FlowFact', function(){
    return {
      // 从服务器获取流水项。
      requestItems: function(http, from, count) {
        return [
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
      },
    }
  })
;

