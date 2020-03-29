// pages/newhouse/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
    data4: [{
      id: 1,
      title: '面积',
      area:[{areaid:1,areaname:'60以下'},{areaid:2,areaname:'60-80'}]
    }, {
      id: 2,
      title: '物业',
      housetype:[{houseid:1,housetype:'住宅'},{houseid:2,housetype:'别墅'}]
    }, {
      id: 3,
      title: '销售状态',
      buytype:[{buyid:1,buyname:'在售'},{buyid:2,buyname:'待售'}]
    },
    {
      id: 4,
      title: '装修',
      renovation:[{renovationid:1,renovation:'毛胚'},{renovationid:2,renovation:'精装'}]
    }
  ],
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  selectedItem: function(e) {
    console.log('id --' + e.detail.selectedId + "cityname = " + e.detail.selectedTitle);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})