// pages/newhouse/ask.js
const zajax = require('../../utils/comm.js');
var listarr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseid:"",
    pages:1,
    housename:"",
    housequestion_num:"",
    q_cont:"",
    questionCount:"",
    qlist:[],
    _iflogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.setData({
      houseid:options.id,
      _iflogin:false
    });
    this.getdata();
  },
  q:function(e){
     this.setData({
        q_cont:e.detail.value
     })
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
  getdata:function(){
    var _this = this;
    this.setData({
      _iflogin:false
    })
    var data = {
      id:this.data.houseid,
      page:this.data.pages
    }
    zajax.requestAjax('/api/house/question',data,'post','正在加载',function(res){
      if(res.code == 0){
         if(_this.data.pages <= 1){
          _this.setData({
            housename:res.data.house.name,
            housequestion_num:res.data.questionCount,
            questionCount:res.data.questionCount
          })
         }
         res.data.question.forEach(function(item){
            listarr.push(item)
         })
         _this.setData({
            qlist:listarr,
            pages:_this.data.pages+1
         })

      }
   })
  },
  tj:function(){
    var _this = this;
    if(this.data.q_cont == ""){
      wx.showModal({
        title:"请填写问题",
        showCancel:false
      })
      return false;
    }
    if(this.data.q_cont.length < 4) {
      wx.showModal({
        title:"请不要填写小于4个字",
        showCancel:false
      })
      return false;
    }
    var data= {
       id:this.data.houseid,
       question:this.data.q_cont
    }
    zajax.requestAjax('/api/house/questionsave',data,'post','正在加载',function(res){
       if(res.code == 0){
        wx.showModal({
          title:res.msg,
          showCancel:false
        })
        _this.setData({
          q_cont:""
       })
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
      title: '楼盘问答'
   })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    listarr = [];
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
     listarr = [];
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
      if(this.data.pages <= this.data.questionCount){
         this.getdata()
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})