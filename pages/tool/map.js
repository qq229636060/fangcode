// pages/tool/map.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var mapdata;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    lng:"",
    lat:"",
    act:"",
    seachname:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options);
     qqmapsdk = new QQMapWX({
      key: 'QAQBZ-2EBCP-4O4DZ-VFMQJ-2C6GZ-OABAD'
      });
      mapdata = [{
      iconPath: "../../img/map1.png",
      id: 0,
      latitude: options.lat,
      longitude: options.lng,
      width: 20,
      height:39,
      title:"本案地址"
    }]
    this.setData({
      markers:mapdata,
      lng:options.lng,
      lat:options.lat
    })
  },
  select:function(e){
     this.setData({
       act:e.currentTarget.dataset.id,
       seachname:e.currentTarget.dataset.name
     });
     this.getdata();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getdata:function(){
    var _this = this;
    var loc = {
      latitude: this.data.lat,
      longitude: this.data.lng
    }
    mapdata = [{
      iconPath: "../../img/map1.png",
      id: 0,
      latitude: this.data.lat,
      longitude: this.data.lng,
      width: 20,
      height:39,
      title:"本案地址"
    }]
    qqmapsdk.search({
          keyword: _this.data.seachname,
          location: loc,
          success: function (res) {
             console.log(res);
              if(res.data.length != 0){
                  res.data.forEach(function(item,index){
                    mapdata.push({
                      iconPath: "../../img/map.png",
                      id: item.id,
                      latitude: item.location.lat,
                      longitude: item.location.lng,
                      title:item.category,
                      width:20,
                      height:27
                    })
                  })
              }
              _this.setData({
                markers:mapdata
              })
          },
          fail: function (res) {
              console.log(res);
          },
          // complete: function (res) {
          //     console.log(res);
          // }
    });
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