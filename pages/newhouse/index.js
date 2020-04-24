// pages/newhouse/index.js
const zajax = require('../../utils/comm.js');
var listarr = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pages:1,
    list:[],
    close_more:false,
    dropDownMenuTitle: ['区域', '价格', '户型', '更多'],
    data1: [],
    data2: [{
        id: 1,
        text: '个人房源'
      },
      {
        id: 2,
        text: '经纪人房源'
      }
    ],
    data3: [{
        id: 1,
        title: '出租'
      },
      {
        id: 2,
        title: '出售'
      }
    ],
    data4: [
      {
      id: 1,
      title: '面积',
      selectbox:[
        {selectid:1,selectname:'60以下',is_select:false},
        {selectid:2,selectname:'60-80',is_select:false},
        {selectid:3,selectname:'60以下',is_select:false},
        {selectid:4,selectname:'60-80',is_select:false},
        {selectid:5,selectname:'60以下',is_select:false},
        {selectid:6,selectname:'60-80',is_select:false},
        {selectid:7,selectname:'60以下',is_select:false},
        {selectid:8,selectname:'60-80',is_select:false}]
    }, {
      id: 2,
      title: '物业',
      selectbox:[{selectid:1,selectname:'住宅',is_select:false},{selectid:2,selectname:'别墅',is_select:false}]
    }, {
      id: 3,
      title: '销售状态',
      selectbox:[{selectid:1,selectname:'在售',is_select:false},{selectid:2,selectname:'待售',is_select:false}]
    },
    {
      id: 4,
      title: '装修',
      selectbox:[{selectid:1,selectname:'毛胚',is_select:false},{selectid:2,selectname:'精装',is_select:false}]
    }
  ],
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var data={
      aid:"",
      pid:"",
      rid:"",
      mid:"",
      sid:"",
      page:_this.data.pages
    }
    this.getselect_data();
    zajax.requestAjax('/api/house/list',data,'post','正在加载',function(res){
       console.log(res.data.length)
       if(res.code == 0){
            if(res.data.length != 0){
            res.data.forEach(function(item){
              if(item.tabs != ""){
                      item.tabs = Object.values(item.tabs)
                  }
                  listarr.push(item)
              })
              _this.setData({
                list:listarr,
                pages:_this.data.pages+1
            })
          }else{
             _this.setData({
               close_more:true
             })
          }
       }
    })
  },
  getselect_data:function(e){
    var _this = this;
    zajax.requestAjax('/api/house/searchoption','','post','正在加载',function(res){
       console.log(res);
       if(res.code == 0){
          _this.setData({
            data1:res.data.area
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
  selectedItem: function(e) {
    console.log('id --' + e.detail.selectedId + "cityname = " + e.detail.selectedTitle);
  },
  gotocont:function(e){
    wx.navigateTo({
      url:"../newhouse/houseinfo?id="+e.currentTarget.dataset.id
    })
  },
  showDialog: function(e) {

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
      var _this = this;
      if(!this.data.close_more){
        _this.onLoad()
      }   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})