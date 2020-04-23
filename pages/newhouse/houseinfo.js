// pages/newhouse/houseinfo.js
const zajax = require('../../utils/comm.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    houseid:"",
    houseinfo:"",
    list:"",//相识楼盘
    bm_name:"",
    bm_tel:"",
    broker:"",//经纪人
    qcode:"",//二维码
    lng:"",
    lat:"",
    background:[
      {
        id:1,
        url:'http://pic.ffw.com.cn/cell/pic/1311/20131121143148_0.jpg'
      },
      {
        id:2,
        url:'http://pic.ffw.com.cn/cell/pic/1311/20131121143148_0.jpg'
      }
    ],//焦点图
    interval:3000,
    duration:500,
    show:false,
    showcode:false,
    tz_txt:"世茂云境的降价通知"//降价通知标题
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var _this = this;
     this.setData({
       houseid:options.id
     })
     var data = {
        id:_this.data.houseid
     }
     zajax.requestAjax('/api/house/info',data,'post','正在加载',function(res){
        if(res.code == 0){
          res.data.info.tabs = Object.values(res.data.info.tabs);
          res.data.same.forEach(function(item){
            item.tabs = Object.values(item.tabs)
          })
          var new_zuo = _this.bMapToQQMap(res.data.info.lng,res.data.info.lat)
          _this.setData({
            houseinfo:res.data.info,
            list:res.data.same,
            broker:res.data.broker,
            lng:new_zuo[0],
            lat:new_zuo[1]
          })
        }
     })
  },
  callme:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.id,
      fail:function(){
        return false
      }
    })
  },
  op_code:function(e){
     
      this.setData({
        qcode:e.currentTarget.dataset.id,
        showcode:true
      })     
  },
  onClose:function(){
    this.setData({
      showcode:false
    })     
  },
  gotomap:function(){
    wx.redirectTo({
      url:"../tool/map?lng="+this.data.lng+"&lat="+this.data.lat
    })
  },
  gotocont:function(e){
    wx.redirectTo({
      url:"houseinfo?id="+e.currentTarget.dataset.id
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bMapToQQMap:function(lng, lat) {
    if (lng == null || lng == '' || lat == null || lat == '')
        return [lng, lat];
    var x_pi = 3.14159265358979324;
    var x = parseFloat(lng) - 0.0065;
    var y = parseFloat(lat) - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var lng = (z * Math.cos(theta)).toFixed(7);
    var lat = (z * Math.sin(theta)).toFixed(7);
    return [lng, lat];
},
  gotojisuan:function(){
    wx.navigateTo({
      url:'../tool/index'
    })
  },
  gotomore:function(){
    wx.navigateTo({
      url:'more_houseinfo'
    })
  },
  gotodp:function(){
    wx.setStorage({
      key:"houseinfo",
      data:this.data.houseinfo
    })
    wx.navigateTo({
      url:'dianpin?id='+this.data.houseid
    })
  },
  notice:function(e){
    this.setData({
         show:true
    });
  },
  close_bm:function(){
    this.setData({
      show:false
 });
  },
  gotodtlist:function(){
    wx.navigateTo({
      url:'dtlist'
    })
  },
  gotohxlist:function(){
    wx.navigateTo({
      url:'hxlist'
    })
  },
  gotoask:function(){
    wx.navigateTo({
      url:'ask?id='+this.data.houseid
    })
  },
  changname:function(e){
      this.setData({
        bm_name:e.detail.value
      })
  },
  changtel:function(e){
      this.setData({
        bm_tel:e.detail.value
      })
  },
  if_mobile(tel){
      var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
      return reg.test(tel);
  },
  bm:function(){
    var _this = this;
    if(this.data.bm_name == "" || this.data.bm_tel == ""){
      wx.showModal({
        title:"请填写完整资料",
        showCancel:false
      });
      return false
    }
    if(!this.if_mobile(this.data.bm_tel)){
      wx.showModal({
        title:"请填写正确的手机号",
        showCancel:false
      });
      return false
    }
    var data={
      id:this.data.houseid,
      name:this.data.bm_name,
      mobile:this.data.bm_tel
    }
    zajax.requestAjax('/api/house/noticesave',data,'post','正在加载',function(res){
        if(res.code == 0){
          wx.showModal({
            title:res.msg,
            showCancel:false,
            success (res) {
              if (res.confirm) {
                _this.setData({
                  show: false
                })
              }    
            }
          });
        }
    })
  }
})