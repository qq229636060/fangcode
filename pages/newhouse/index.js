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
    data1: [{
        id: 0,
        title: '不限',
        childModel: [{
            id: '0-1',
            title: '不限'
          }
        ]
      },
      {
        id: 1,
        title: '道里区',
        childModel: [{
            id: '1-1',
            title: '中央大街'
          },
          {
            id: '1-2',
            title: '埃德蒙顿路'
          }
        ]
      },
      {
        id: 2,
        title: '南岗区',
        childModel: [{
            id: '2-1',
            title: '果戈里'
          },
          {
            id: '2-2',
            title: '通达街'
          }
        ]
      },
      {
        id: 3,
        title: '松北区',
        childModel: [{
            id: '3-1',
            title: '世茂大道'
          },
          {
            id: '3-2',
            title: '市政府'
          }
        ]
      }
    ],
    data2: [{
        id: 1,
        title: '个人房源'
      },
      {
        id: 2,
        title: '经纪人房源'
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
                list:listarr
              });
              _this.setData({
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