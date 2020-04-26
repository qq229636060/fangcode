// pages/newhouse/hxlist.js
const zajax = require('../../utils/comm.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act:0,
    houseid:"",
    hxdata:"",
    allhx:""
  },
  select:function(e){
    console.log(e.currentTarget.dataset.id)
    var tiaojian = e.currentTarget.dataset.s;
    var hxlist = this.data.allhx;
    var tmparr = [];
    hxlist.forEach(function(item,index){
        if(item.shi == tiaojian.shi &&  item.ting == tiaojian.cnt){
          tmparr.push(item)
        }
    }) 
    if(tmparr != ''){
      this.setData({
        act:e.currentTarget.dataset.id,
        'hxdata.photo':tmparr
      });
    }else{
      this.setData({
        act:e.currentTarget.dataset.id
      });
      this.getdata()
    }
   
 },
 gotohxcont:function(e){
  wx.navigateTo({
    url:"hxcont?id="+this.data.houseid+"&hxid="+e.currentTarget.dataset.id
  })
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
  getdata(){
    var _this= this;
    var data ={
      id:this.data.houseid,
      tab:1
   }
   zajax.requestAjax('/api/house/hx',data,'post','正在加载',function(res){
      if(res.code == 0){
         _this.setData({
           hxdata:res.data,
           allhx:res.data.photo
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