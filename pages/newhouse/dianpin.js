// pages/newhouse/dianpin.js
const zajax = require('../../utils/comm.js');
var listarr = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
     houseid:"",
     houseinfo:"",
     pages:1,
     dianpinlist:[],
     close_more:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
   
    wx.getStorage({
      key: 'houseinfo',
      success (res) {
         _this.setData({
            houseinfo:res.data
         })
      }
    })
     this.setData({
       houseid:options.id,
       dianpinlist:[]
     });
     this.getdata();
  },
  getdata:function(){
    var _this = this;
    var data={
      id:this.data.houseid,
      page:this.data.pages
    }
    zajax.requestAjax('/api/house/yelp',data,'post','正在加载',function(res){
         if(res.code == 0){
            console.log(res.data.yelp.length)
            if(res.data.yelp.length != 0){
                res.data.yelp.forEach(function(item){
                  listarr.push(item)
                })
                _this.setData({
                  pages:_this.data.pages+1,
                  dianpinlist:listarr
                })
                console.log(_this.data.dianpinlist)
            }else{
                _this.setData({
                  close_more:true
                })
            }
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
      title: '楼盘点评'
   })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    listarr = []
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    listarr = []
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
     var _this = this;
     if(!_this.data.close_more){
        _this.getdata();
     }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  goto_fbdp(){
    wx.navigateTo({
      url:'fb_dianpin?id='+this.data.houseid
    })
  }
})