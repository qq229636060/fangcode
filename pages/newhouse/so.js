// pages/newhouse/so.js
const zajax = require('../../utils/comm.js');
var listarr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:"",
    pages:1,
    list:[],
    close_more:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  so:function(e){
    this.setData({
      keyword:e.detail.value
    })
    if(e.detail.value != ""){
      listarr = []
      this.getdata()
    }else{
      listarr = []
       this.setData({
         list:[],
         pages:1
       })
    }
    
  },
  getdata:function(){
    var _this = this
    var data = {
      kw:this.data.keyword,
      page:_this.data.pages
    }
    zajax.requestAjax('/api/house/list',data,'post','正在加载',function(res){
      console.log(res.data.length)
      if(res.code == 0){
           if(res.data.length != 0){
           res.data.forEach(function(item){
             if(item.tabs != ""){
                     item.tabs = Object.values(item.tabs)
                 }
                 listarr.push(item)
             })
             _this.setData({
               list:listarr,
               pages:_this.data.pages
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
    wx.navigateTo({
      url:"../newhouse/houseinfo?id="+e.currentTarget.dataset.id
    })
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
    var _this = this;
    console.log(this.data.close_more)
    if(!this.data.close_more){
      _this.getdata()
    }   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})