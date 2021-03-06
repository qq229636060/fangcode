// pages/tool/index.js
var jsonData = require('../../utils/tool_config.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    money:"",//商业贷款金额
    money1:"",//公积金贷款金额
    money_zh:"",//组合贷款商业金额
    money_zh1:"",//组合贷款公积金金额
    zhsy_year:"",//组合商业年限
    zhgjj_year:"",//组合公积金
    zhsyyear_index:19,
    zhsyyear_year:20,
    zhgjjyear_index:19,
    zhgjjyear_year:20,
    active:"a",
    year_array:jsonData.dataList.loanyear,
    year_index:19,
    dk_year:20,
    shangdai_index:0,
    shangdai_numdata:1,//贷款利率
    gjjdai_index:0,
    gjjdai_numdata:1,
    zhsydai_index:0,
    zhsydai_numdata:1,
    zhgjjdai_index:0,
    zhgjjdai_numdata:1,
    shangdai_lilvarr:jsonData.dataList.shangdaiLilv,
    gjj_lilvarr:jsonData.dataList.gjjLilv,
    shangdai_array:jsonData.dataList.shangdaiSelect,//商代选择
    gjjdai_array:jsonData.dataList.gjjSelect//公积金选择
  },
  calllilv(){
    var lastlilv;
    var zhlast ={};
    var _this = this;
    if(_this.data.active == "a"){
      _this.data.shangdai_lilvarr.forEach(function(item,index){
          if(_this.data.dk_year>=item.year){
             lastlilv = (_this.data.shangdai_numdata*item.lilv).toFixed(4)
          }
      })
    }else if(_this.data.active == "b"){
      _this.data.gjj_lilvarr.forEach(function(item,index){
         if(_this.data.dk_year>=item.year){
            lastlilv = (_this.data.gjjdai_numdata*item.lilv).toFixed(4)
         }
     })
    }else if(_this.data.active == "c"){
      _this.data.shangdai_lilvarr.forEach(function(item,index){
        if(_this.data.zhsyyear_year>=item.year){
          zhlast.sylv = (_this.data.zhsydai_numdata*item.lilv).toFixed(4)
        }
      })
      _this.data.gjj_lilvarr.forEach(function(item,index){
        if(_this.data.zhgjjyear_year>=item.year){
          zhlast.gjjlv = (_this.data.gjjdai_numdata*item.lilv).toFixed(4)
        }
      })
      return zhlast;
    }
    return lastlilv;
  },
  ts_money:function(){
    wx.hideLoading()
        wx.showToast({
          title:"请填写贷款金额",
          mask:true,
          icon:'none'
      })
  },
  if_empt:function(e){
    if(e == "a"){
      console.log(this.data.money)
      if(this.data.money == ''){
        return false
      }else{
        return true
      }
    }else if(e == "b"){
      if(this.data.money1 == ''){
        return false
      }else{
        return true
      }
    }else if(e == "c"){
      if(this.data.money_zh == '' || this.data.money_zh1 == ''){
        wx.hideLoading()
        return false
      }else{
        return true
      }
    }

  },
  goto:function(e){
    var _this = this;
    wx.showLoading({
      title: '计算中',
    })
    var _this = this;
    if(_this.data.active == "a"){
       if(!_this.if_empt("a")){
          _this.ts_money()
         return false
       }
    }else if(_this.data.active == "b"){
      if(!_this.if_empt("b")){
        _this.ts_money()
       return false
     }
    }else if(_this.data.active == "c"){
        console.log(_this.if_empt("c"))
        if(!_this.if_empt("c")){
          _this.ts_money()
        return false
      }
    }
    if(this.data.active == "a"){
      var last_lv = _this.calllilv();
      wx.navigateTo({
        url:'toolend',
        success: function(res) {
          res.eventChannel.emit('moneydata',{ sydk_money: _this.data.money,sydk_year:_this.data.dk_year,sydk_lilv:last_lv,tyepe:1})
        }
      })
    }else if(this.data.active == "b"){
      var last_lv = _this.calllilv();
      wx.navigateTo({
        url:'toolend',
        success: function(res) {
          res.eventChannel.emit('moneydata',{ sydk_money: _this.data.money1,sydk_year:_this.data.dk_year,sydk_lilv:last_lv,tyepe:2})
        }
      })
    }else if(this.data.active == "c"){
      var last_zhsylv = _this.calllilv();
      wx.navigateTo({
        url:'toolend',
        success: function(res) {
          res.eventChannel.emit('moneydata',{
            zhmoney: _this.data.money_zh,
            zhmoney1: _this.data.money_zh1,
            zhyear:_this.data.zhsyyear_year,
            zhyear1:_this.data.zhgjjyear_year,
            last_lilv:last_zhsylv.sylv,
            last_lilv1:last_zhsylv.gjjlv,
            tyepe:3})
        }
      })
      return false
    }

    
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
      console.log(jsonData.dataList.gjjSelect)
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
    var _this = this;
    if(e.target.dataset.name == "zh_syyear"){
      this.setData({
        zhsyyear_index: e.detail.value,
        zhsyyear_year:_this.data.year_array[e.detail.value].year
      })
    }else if(e.target.dataset.name == "zh_gjjyear"){
      this.setData({
        zhgjjyear_index: e.detail.value,
        zhgjjyear_year:_this.data.year_array[e.detail.value].year
      })
    }else{
      this.setData({
        year_index: e.detail.value,
        dk_year:_this.data.year_array[e.detail.value].year
      })
    }
  },
  bindpicker_shangdaiSelect:function(e){
    if(e.target.dataset.name == "sy_lv"){
      this.setData({
        zhsyyear_index: e.detail.value,
        shangdai_numdata:this.data.shangdai_array[e.detail.value].lilv
      })
    }else if(e.target.dataset.name == "gjj_lv"){
      this.setData({
        gjjdai_index: e.detail.value,
        gjjdai_numdata:this.data.gjjdai_array[e.detail.value].lilv
      })
    }else if(e.target.dataset.name == "zh_syname"){
      this.setData({
        zhsydai_index: e.detail.value,
        zhsydai_numdata:this.data.gjjdai_array[e.detail.value].lilv
      })
    }else if(e.target.dataset.name == "zh_gjjname"){
      this.setData({
        zhgjjdai_index: e.detail.value,
        zhgjjdai_numdata:this.data.gjjdai_array[e.detail.value].lilv
      })
    }
  },
  bindinput_money:function(e){
    if(e.currentTarget.dataset.name == "symoney"){
      this.setData({
        money:e.detail.value
      })
    }else if(e.currentTarget.dataset.name == "gjjmoney"){
      console.log(e)
      this.setData({
        money1:e.detail.value
      })
    }else if(e.currentTarget.dataset.name == "zh_money"){
      this.setData({
        money_zh:e.detail.value
      })
    }else if(e.currentTarget.dataset.name == "zh_money1"){
      this.setData({
        money_zh1:e.detail.value
      })
    }
    
  },
  nav_onChange:function(e){
    console.log(e)
    this.setData({
      active:e.detail.name
    })
  }
})