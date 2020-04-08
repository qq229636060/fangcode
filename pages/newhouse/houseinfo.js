// pages/newhouse/houseinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background:[
      {
        id:1,
        url:'http://pic.ffw.com.cn/cell/pic/1311/20131121143148_0.jpg'
      },
      {
        id:2,
        url:'http://pic.ffw.com.cn/cell/pic/1311/20131121143148_0.jpg'
      }
    ],//焦点图
    interval:3000,
    duration:500,
    show:false,
    tz_txt:"世茂云境的降价通知"//降价通知标题
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

  },
  notice:function(e){
    this.setData({
         show:true
    });
  }
})