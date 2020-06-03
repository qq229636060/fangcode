// pages/newhouse/dtlist.js
const zajax = require('../../utils/comm.js');
var newlist = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
      houseid:"",
      pages:1,
      dtarr:"",
      close_more:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this = this;
      this.setData({
        houseid:options.id
      })
      this.getdata();

  },
  getdata:function(){
    var _this = this;
    var data ={
       id:this.data.houseid,
       page:this.data.pages
    }
    zajax.requestAjax('/api/house/news',data,'post','正在加载',function(res){
        if(res.code == 0){
           if(res.data.news.length != 0){
            res.data.news.forEach(function(item){
              newlist.push(item)
             })
             _this.setData({
                dtarr:newlist,
                pages:_this.data.pages+1
             })
           }else{
             _this.setData({
                close_more:true
             })
           }
           
        }
    })
  },
  gotocont:function(e){
    console.log(e)
    wx.navigateTo({
      url:"dtcont?id="+e.currentTarget.dataset.id+"&houseid="+e.currentTarget.dataset.houseid
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
      title: '楼盘动态'
   })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    newlist = [];
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    newlist = [];
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
      if(!this.data.close_more){
        this.getdata()
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})