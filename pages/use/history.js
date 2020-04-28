// pages/use/history.js
const zajax = require('../../utils/comm.js');
var listarr = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
     pages:1,
     close_more:false,
     list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var data={
      page:this.data.pages
    }
    zajax.requestAjax('/api/my/history',data,'post','正在加载',function(res){
        if(res.code == 0){
           res.data.forEach(function(item){
             listarr.push(item)
           }) 
           _this.setData({
             list:listarr
           })
        }
    })
  },
  gotocont:function(e){
    wx.navigateTo({
      url:"../newhouse/houseinfo?id="+e.currentTarget.dataset.id
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