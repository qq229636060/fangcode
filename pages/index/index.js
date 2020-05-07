//index.js
//获取应用实例

const app = getApp();
const zajax = require('../../utils/comm.js');
Page({
  data: {
    adv:"",
    autoplay:false,
    interval:3000,
    list:[]
  },
  gotocont:function(e){
    wx.navigateTo({
      url:"../newhouse/houseinfo?id="+e.currentTarget.dataset.id
    })
  },
  vrlist:function(e){
    app.globalData.vr = "1"
    wx.switchTab({
      url: '../newhouse/index'
  })
  },
  gotoso:function(){
    wx.navigateTo({
      url:"../newhouse/so"
    })
  },
  gotodtcont:function(){
    wx.navigateTo({
      url:"../newhouse/dtlist?id=''"
    })
  },
  gotojisuan:function(){
    wx.navigateTo({
      url:"../tool/index"
    })
  },
  gotonewlist:function(){
    wx.navigateTo({
      url:"../newhouse/index"
    })
  },
  onLoad: function () {
    var _this = this;
    zajax.requestAjax('/api/index/index','','post','正在加载',function(res){
      res.data.house.forEach(function(item){
          if(item.tabs != ""){
              item.tabs = Object.values(item.tabs)
          }
      })
      console.log(res.data.house)
      _this.setData({
        adv:res.data.adv,
        list:res.data.house
      })
    },function(res){
			console.log(res)//请求失败回调
		})  
    // if (app.globalData.userInfo) {
    //   console.log(app.globalData)
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
        
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  }
})
