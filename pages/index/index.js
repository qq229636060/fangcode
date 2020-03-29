//index.js
//获取应用实例

const app = getApp();

Page({
  data: {
    background:[
      {
        id:1,
        url:'https://gy.ffw.com.cn/static/wap/upflie/ad4.png'
      },
      {
        id:2,
        url:'https://gy.ffw.com.cn/static/wap/upflie/ad4.png'
      }
    ],//焦点图
    autoplay:false,
    interval:3000,
    list:[]
  },
  getPhoneNumber (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log(app.globalData)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
})
