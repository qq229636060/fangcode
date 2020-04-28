// pages/tool/map.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    lng:"",
    lat:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options);
     qqmapsdk = new QQMapWX({
      key: 'QAQBZ-2EBCP-4O4DZ-VFMQJ-2C6GZ-OABAD'
      });
     var mapdata = [{
      iconPath: "../../img/map.png",
      id: 0,
      latitude: options.lat,
      longitude: options.lng,
      width: 50,
      height: 50,
      title:"本案地址"
    }]
    this.setData({
      markers:mapdata,
      lng:options.lng,
      lat:options.lat
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
    var loc = {
      latitude: this.data.lat,
      longitude: this.data.lng
    }
    qqmapsdk.search({
          keyword: '酒店',
          location: loc,
          success: function (res) {
              this.setData({

              })
          },
          fail: function (res) {
              console.log(res);
          },
          // complete: function (res) {
          //     console.log(res);
          // }
    });
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