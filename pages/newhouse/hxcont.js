// pages/newhouse/hxcont.js
const zajax = require('../../utils/comm.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      houseid:"",
      hxid:"",
      picarr:"",
      hxinfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
         houseid:options.id,
         hxid:options.hxid
      })
      this.getdata()
  },
  getdata:function(){
    var _this = this;
    var data = {
       id:this.data.houseid,
       hxId:this.data.hxid
    }
    zajax.requestAjax('/api/house/hxInfo',data,'post','正在加载',function(res){
        if(res.code == 0){
            _this.setData({
            picarr:res.data.photo,
            hxinfo:res.data
            })
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
      title: '房源户型'
   })
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