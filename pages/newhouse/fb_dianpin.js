// pages/newhouse/fb_dianpin.js
const zajax = require('../../utils/comm.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:15,
    act:0,
    houseid:"",
    cont:"",
    _iflogin:false
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
      number:z,
      cont:e.detail.value
    });
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      houseid:options.id,
      _iflogin:false
    });
  },
  getdata(){
    this.setData({
      _iflogin:false
    });
  },
  gotomobile:function(e){
    if(e.detail == "close"){
      this.setData({
        _iflogin:false
      })
    }else{
      wx.navigateTo({
        url:'../use/mobile'
      })
    }
  },
  fb:function(){
    var _this = this
    if(this.data.number > 0){
      wx.showModal({
        title:"还差"+this.data.number+"字才能点评",
        showCancel:false
      });
      return false
    }
    var data = {
       id:this.data.houseid,
       look:this.data.act,
       yelp:this.data.cont
    }
    zajax.requestAjax('/api/house/yelpsave',data,'post','正在加载',function(res){
       if(res.code == 0){
        wx.showModal({
          title:res.msg,
          showCancel:false,
          success (res) {
            if (res.confirm) {
                wx.navigateBack({//返回
                  delta: 1
                })
            }
          }
        });
       }else if(res.code == -100){
         _this.setData({
          _iflogin:true
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
    wx.setNavigationBarTitle({
      title: '楼盘点评'
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