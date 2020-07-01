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
  gotoh5:function(e){
    console.log()
    wx.navigateTo({
      url:"../tool/web?url="+e.currentTarget.dataset.url
    })
  },
  onShareAppMessage: function( options ){
    　　var that = this;
    　　// 设置转发内容
    　　var shareObj = {
    　　　　title: "房小8，专业购房帮手！",
    　　　　path: '/pages/index/index', // 默认是当前页面，必须是以‘/’开头的完整路径
          imageUrl: '', //转发时显示的图片路径，支持网络和本地，不传则使用当前页默认截图。
    　　　　success: function(res){　 // 转发成功之后的回调　　　　　
    　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
    　　　　　　}
    　　　　},
    　　　　fail: function(){　// 转发失败之后的回调
    　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
    　　　　　　　　// 用户取消转发
    　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
    　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
    　　　　　　}
    　　　　},
    　　　　complete: function(){
    　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
    　　　　}
    　　};
    　　// 来自页面内的按钮的转发
    　　if( options.from == 'button' ){
    　　　　var dataid = options.target.dataset; //上方data-id=shareBtn设置的值
    　　　　// 此处可以修改 shareObj 中的内容
    　　　　shareObj.path = '/pages/btnname/btnname?id='+dataid.id;
    　　}
    　　// 返回shareObj
    　　return shareObj;
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
