// pages/newhouse/pic.js
const zajax = require('../../utils/comm.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    houseid:"",
    titlearr:"",
    piclist:"",
    allpicarr:""
  },
  look:function(e){
    console.log(e)
    console.log(e.currentTarget.dataset.vrurl)
    if(e.currentTarget.dataset.vrurl && e.currentTarget.dataset.vrurl !="undefined"){
      wx.navigateTo({
        url:"../tool/web?url="+e.currentTarget.dataset.vrurl
      })
    }else{
      console.log(this.data.allpicarr)
      wx.previewImage({
        current: e.currentTarget.dataset.url, // 当前显示图片的http链接
        urls: this.data.allpicarr // 需要预览的图片http链接列表
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        houseid:options.id
      })
      this.getdata();
  },
  getdata:function(){
    var _this = this;
    var data ={
      id: this.data.houseid
    }
    zajax.requestAjax('/api/house/photo',data,'post','正在加载',function(res){
        if(res.code == 0){
          var parr = [];
          var nav = [];
          var allpic = [];
          var configarr = res.data.photoType;
          if(res.data.vr.length != 0){
             nav.push("VR");
             parr[0] = res.data.vr
          }
          for (let key in res.data.photo) {
            for(let i in configarr){
               if(key == i){
                  nav.push(configarr[i])
               }
            }
            parr.push(res.data.photo[key]); //属性
          }
          parr.forEach(function(item){
              item.forEach(function(items){
                  allpic.push(items.img)
              })
          })
          _this.setData({
            titlearr:nav,
            piclist:parr,
            allpicarr:allpic
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
      title: '楼盘相册'
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