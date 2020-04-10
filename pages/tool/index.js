// pages/tool/index.js
var jsonData = require('../../utils/tool_config.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    money:"",
    active:"a",
    year_array:jsonData.dataList.loanyear,
    year_index:0,
    dk_year:1,
    shangdai_index:0,
    shangdai_numdata:1,//商业贷款利率
    shangdai_array:jsonData.dataList.shangdaiSelect
  },
  goto:function(e){
    wx.showLoading({
      title: '计算中',
    })
    var _this = this;
    if(this.data.money == ''){
      wx.hideLoading()
      wx.showToast({
        title:"请填写贷款金额",
        mask:true,
        icon:'none'
      })
      return false
    }
    setTimeout(()=>{
      wx.navigateTo({
        url:'toolend',
        success: function(res) {
          res.eventChannel.emit('moneydata',{ sydk_money: _this.data.money,sydk_year:_this.data.dk_year,sydk_lilv:_this.data.shangdai_numdata,tyepe:1})
        }
      })
    },1000)
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      console.log(jsonData)
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
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindpicker_year:function(e){
    this.setData({
      year_index: e.detail.value,
      dk_year:this.data.year_array[e.detail.value].year
    })
    console.log(this.data.dk_year)
  },
  bindpicker_shangdaiSelect:function(e){
   
    this.setData({
      shangdai_index: e.detail.value,
      shangdai_numdata:this.data.shangdai_array[e.detail.value].lilv
    })
  },
  bindinput_money:function(e){
    this.setData({
      money:e.detail.value
    })
  }
})