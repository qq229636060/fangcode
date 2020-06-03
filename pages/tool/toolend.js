// pages/tool/toolend.js
import loan from '../../utils/calculate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    prevpage_data:{},//接收数据
    zh_data:{},//组合贷款接收
    enddata:"",//计算后的本息数据
    enddata1:"",//计算后的本金数据
    zhenddata:"",//组合本息
    zhenddata1:"",//组合本金
    tyeps:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('moneydata', function(data) {
      _this.setData({
        tyeps: data.tyepe
     });
      if(data.tyepe == '3'){
        _this.setData({
          zh_data: data
       });
       _this.zh_jisuan()
      }else{
        _this.setData({
          prevpage_data: data
       });
       _this.jisuan()
      }
    })  
  },
  zh_jisuan:function(){
    console.log(this.data.zh_data)
    var zhjsdata = loan.Calculation.zuhe("1",this.data.zh_data.zhmoney,this.data.zh_data.zhmoney1,this.data.zh_data.zhyear,this.data.zh_data.zhyear1,this.data.zh_data.last_lilv,this.data.zh_data.last_lilv1);
    var zhjsdata1 = loan.Calculation.zuhe("2",this.data.zh_data.zhmoney,this.data.zh_data.zhmoney1,this.data.zh_data.zhyear,this.data.zh_data.zhyear1,this.data.zh_data.last_lilv,this.data.zh_data.last_lilv1)
    
    zhjsdata.totalLixi = (zhjsdata.totalLixi).toFixed(2)
    zhjsdata.totalPrice = (zhjsdata.totalPrice).toFixed(2)
    zhjsdata.yuegong = (zhjsdata.yuegong).toFixed(2)
    zhjsdata1.totalLixi = (zhjsdata1.totalLixi).toFixed(2)
    zhjsdata1.totalPrice = (zhjsdata1.totalPrice).toFixed(2)
    zhjsdata1.yuegong = (zhjsdata1.yuegong).toFixed(2);
    zhjsdata1.yuegongdijian = (zhjsdata1.yuegongdijian).toFixed(2)
    console.log(zhjsdata)
    console.log(zhjsdata1)
    this.setData({
      zhenddata:zhjsdata,
      zhenddata1:zhjsdata1
    })
  },
  jisuan:function(){
        var jsdata = loan.Calculation.singleDk("1",this.data.prevpage_data.sydk_money,this.data.prevpage_data.sydk_year,this.data.prevpage_data.sydk_lilv);
        var jsdata1 = loan.Calculation.singleDk("2",this.data.prevpage_data.sydk_money,this.data.prevpage_data.sydk_year,this.data.prevpage_data.sydk_lilv);
        jsdata.totalLixi = (jsdata.totalLixi).toFixed(2)
        jsdata.totalPrice = (jsdata.totalPrice).toFixed(2)
        jsdata.yuegong = (jsdata.yuegong).toFixed(2)
        jsdata1.totalLixi = (jsdata1.totalLixi).toFixed(2)
        jsdata1.totalPrice = (jsdata1.totalPrice).toFixed(2)
        jsdata1.yuegong = (jsdata1.yuegong).toFixed(2);
        jsdata1.yuegongdijian = (jsdata1.yuegongdijian).toFixed(2)
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
    wx.setNavigationBarTitle({
      title: '房贷计算器'
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