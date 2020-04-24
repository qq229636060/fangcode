// pages/newhouse/dtcont.js
const zajax = require('../../utils/comm.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
      houseid:"",
      newid:"",
      continfo:"",
      title:"",
      time:"",
      conttxt:"",
      list:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
     this.setData({
       houseid:options.houseid,
       newid:options.id
     })
     var data ={
      id:this.data.houseid,
      newsId:this.data.newid
     }
     zajax.requestAjax('/api/house/newsInfo',data,'post','正在加载',function(res){
        if(res.code == 0){
           _this.setData({
              continfo:res.data.info,
              conttxt:res.data.info.info.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '),
              list:res.data.same
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