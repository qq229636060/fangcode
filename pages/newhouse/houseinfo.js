// pages/newhouse/houseinfo.js
const zajax = require('../../utils/comm.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    houseid:"",
    houseinfo:"",
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
     var _this = this;
     this.setData({
       houseid:options.id
     })
     var data = {
        id:_this.data.houseid
     }
     zajax.requestAjax('/api/house/info',data,'post','正在加载',function(res){
        if(res.code == 0){
          res.data.info.tabs = Object.values(res.data.info.tabs);
          _this.setData({
            houseinfo:res.data.info
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gotojisuan:function(){
    wx.navigateTo({
      url:'../tool/index'
    })
  },
  gotomore:function(){
    wx.navigateTo({
      url:'more_houseinfo'
    })
  },
  gotodp:function(){
    wx.navigateTo({
      url:'dianpin'
    })
  },
  notice:function(e){
    this.setData({
         show:true
    });
  },
  close_bm:function(){
    this.setData({
      show:false
 });
  },
  gotodtlist:function(){
    wx.navigateTo({
      url:'dtlist'
    })
  },
  gotohxlist:function(){
    wx.navigateTo({
      url:'hxlist'
    })
  },
  gotoask:function(){
    wx.navigateTo({
      url:'ask'
    })
  }
})