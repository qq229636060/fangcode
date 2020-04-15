// pages/tool/toolend.js
import loan from '../../utils/calculate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    prevpage_data:{},//接受的等额数据
    enddata:"",//计算后的本息数据
    enddata1:"",//计算后的本金数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('moneydata', function(data) {
      _this.setData({
         prevpage_data: data
      })
    })
    console.log(this.data.prevpage_data);
    this.jisuan()
  },
  jisuan:function(){
        var jsdata = loan.Calculation.singleDk(this.data.prevpage_data.tyepe,this.data.prevpage_data.sydk_money,this.data.prevpage_data.sydk_year,this.data.prevpage_data.sydk_lilv);
        var jsdata1 = loan.Calculation.singleDk('2',this.data.prevpage_data.sydk_money,this.data.prevpage_data.sydk_year,this.data.prevpage_data.sydk_lilv);
        jsdata.totalLixi = jsdata.totalLixi.toFixed(2)
        jsdata.totalPrice = jsdata.totalPrice.toFixed(2)
        jsdata.yuegong = jsdata.yuegong.toFixed(2)
        jsdata1.totalLixi = jsdata1.totalLixi.toFixed(2)
        jsdata1.totalPrice = jsdata1.totalPrice.toFixed(2)
        jsdata1.yuegong = jsdata1.yuegong.toFixed(2);
        jsdata1.yuegongdijian = jsdata1.yuegongdijian.toFixed(2)
        console.log(jsdata1)
    this.setData({
      enddata:jsdata,
      enddata1:jsdata1
    })
  },
  onChange(e){
     console.log(e)
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