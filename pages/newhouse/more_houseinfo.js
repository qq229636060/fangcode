// pages/newhouse/more_houseinfo.js
const zajax = require('../../utils/comm.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      houseid:"",
      housetxt:"",
      mapdata:[{
        iconPath: "../../img/map1.png",
        id: 0,
        latitude: "",
        longitude:"",
        width: 20,
        height:39,
        title:"本案地址"
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
      this.setData({
        houseid:options.id
      });
      var data = {
         id:this.data.houseid
      }
      zajax.requestAjax('/api/house/param',data,'post','正在加载',function(res){
          if(res.code == 0 ){
              res.data.tabs = Object.values(res.data.tabs);
             _this.setData({
                housetxt:res.data,
                'mapdata[0].latitude':res.data.lat,
                'mapdata[0].longitude':res.data.lng
             })
          }
      })
  },
  gotomap:function(){
    wx.navigateTo({
      url:"../tool/map?lng="+this.data.housetxt.lng+"&lat="+this.data.housetxt.lat
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
      title: '楼盘详情'
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