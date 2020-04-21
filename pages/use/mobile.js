// pages/use/mobile.js
const app = getApp();
const zajax = require('../../utils/comm.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getPhoneNumber (e) {
    console.log(e)
    wx.login({
      success: res => {
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        var data={
          code:res.code,
          encryptedData:e.detail.encryptedData,
          iv:e.detail.iv
        }
        zajax.requestAjax('/api/wechat/mobile',data,'post','正在加载',function(res){
           if(res.code == 0){
            wx.setStorage({
              key:"token_data",
              data:res.data.token
            })
            wx.navigateBack({
              delta: 1,
              success: function (e) {
                  console.log(getCurrentPages())
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onLoad();
              }
            })
           }
        })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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