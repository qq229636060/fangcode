// pages/newhouse/fb_dianpin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:15,
    act:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  select:function(e){
     this.setData({
      act:e.currentTarget.dataset.id
    });
  },
  cont:function(e){
    var z = 15;
    var index = e.detail.value.length;
    if(z-index <= 0){
       z =0
    }else{
        z = z - index
    }
    this.setData({
      number:z
    });
  },
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