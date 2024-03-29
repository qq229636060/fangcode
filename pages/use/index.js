// pages/use/index.js
const app = getApp();
const zajax = require('../../utils/comm.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isLogin:false,
      authorization:false,
      servicePhone:"",
      useinfo:"",
      showcode:false
  },
  onClose:function(){
    this.setData({
      showcode:false
    })     
  },
  op_code:function(e){
     this.setData({
       showcode:true
     })     
 },
 saveImage() {
  wx.showLoading({
    title: '保存中...', 
    mask: true,
  });
  wx.downloadFile({
    url:this.data.qcode,
    success: function(res) {
      if (res.statusCode === 200) {
        let img = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: img,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            });
          },
          fail(res) {
            wx.showToast({
              title: '保存失败',
              icon: 'success',
              duration: 2000
            });
          }
        });
      }
    }
  });
},
  gotofocus:function(){
    if(this.data.isLogin){
      wx.navigateTo({
        url:'focus'
      })
    }
  },
  gotomobile:function(){
      wx.navigateTo({
        url:'./mobile'
      })
  },
  callme:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.id,
      fail:function(){
        return false
      }
    })
  },
  btn_sub:function(res){
    var _this =this;
    console.log(res)
    app.globalData.userInfo = res.detail.userInfo;
    app.globalData.usedata = res.detail;
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      wx.login({
        success: res => {
          console.log(res);
          var data={
            code:res.code,
            encryptedData:app.globalData.usedata.encryptedData,
            iv:app.globalData.usedata.iv,
            signature:app.globalData.usedata.signature,
            rawData:app.globalData.usedata.rawData
          }
          zajax.requestAjax('/api/wechat/auth',data,'post','正在加载',function(res){
             if(res.code == 0){
               console.log(res);
              _this.gotomobile()
             }
          })
        }
      })
    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
         console.log(1)
      }
    } else {
      console.log(2)
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getdata()
    
  },
  gotolishi:function(){
    if(this.data.isLogin){
      wx.navigateTo({
        url:'history'
      })
    }
  },
  getdata(){
    var _this = this;
    zajax.requestAjax('/api/my/index','','post','正在加载',function(res){
        if(res.code == 0){
          console.log(res.data)
          _this.setData({
            servicePhone:res.data.servicePhone
           })
          if (res.data.member == "") {
            _this.setData({
                authorization:false,
              })
          }else{      
            _this.setData({
              authorization:true,
              isLogin:true,
              useinfo:res.data.member,
              
            })
          }
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '我的'
   })
    //this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})