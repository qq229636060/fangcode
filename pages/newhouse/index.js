// pages/newhouse/index.js
const app = getApp();
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
    data2: [],
    data3: [],
    data4: [
        {
        id: 1,
        title: '面积',
        selectbox:[]
      }, {
        id: 2,
        title: '物业',
        selectbox:[]
      }, {
        id: 3,
        title: '销售状态',
        selectbox:[]
      },
      {
        id: 4,
        title: '装修',
        selectbox:[]
      }
  ],
      aid:"",//区域
      pid:"",//价格
      rid:"",//户型
      mid:"",//面积
      sid:"",//状态
      tid:"",//物业类型
      did:"",//装修
      vr:"",
      fristcall:true
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if(app.globalData.vr == "1"){
      this.setData({
        vr:1,
        pages:1
      })
      app.globalData.vr = ""
    }
    var data={
      aid:this.data.aid,//区域
      pid:this.data.pid,//价格
      rid:this.data.rid,//户型
      mid:this.data.mid,//面积
      sid:this.data.sid,//状态
      tid:this.data.tid,//物业类型
      did:this.data.did,//装修
      kw:"",
      vr:this.data.vr,
      page:_this.data.pages
    }
    if(this.data.fristcall){
      this.getselect_data();
    }
    
    zajax.requestAjax('/api/house/list',data,'post','正在加载',function(res){
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
  changarr:function(objs,room){
    var arr= [];
    if(room == 0){
      for (let i in objs) {
        objs[i].id = i;
        arr.push(objs[i]); //属性
      }
      console.log(arr)
      return arr
    }else{
      for (let i in objs) {
        arr.push(objs[i]); //属性
      }
    }
   
    return arr
  },
  changarr1:function(objs){
     var arr = []
     for (let i in objs) {
      arr.push({'name':objs[i],'id':i}); //属性
      }
      return arr
  },
  getselect_data:function(e){
    var _this = this;
    zajax.requestAjax('/api/house/searchoption','','post','正在加载',function(res){
       if(res.code == 0){
          _this.setData({
            data1:res.data.area,
            data2:_this.changarr(res.data.soPrice),
            data3:_this.changarr(res.data.soRoom,0),
            'data4[0].selectbox':_this.changarr(res.data.soMj),
            'data4[1].selectbox':_this.changarr1(res.data.soPropertyType),
            'data4[2].selectbox':_this.changarr1(res.data.soStatus),
            'data4[3].selectbox':_this.changarr1(res.data.soDecorate),
            fristcall:false
            
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
  onShow: function (options) {
    wx.setNavigationBarTitle({
      title: '房小8新房'
   })
    if(app.globalData.vr == "1"){
      this.setData({
        vr:1,
        pages:1,
        list:[],
        close_more:false
      })
      listarr = []
      this.onLoad()
    }else{
      this.setData({
        vr:"",
        pages:1,
        list:[],
        close_more:false
      })
      listarr = []
      this.onLoad()
    }
  },
  gotoso:function(){
    wx.navigateTo({
      url:"../newhouse/so"
    })
  },
  selectedItem: function(e) {
    console.log(e)
    console.log('id --' + e.detail.selectedId + "cityname = " + e.detail.selectedTitle);
    if(e.detail.index == 1){
       this.setData({
          aid:e.detail.selectedId
       })
    }else if(e.detail.index == 2){
      console.log(e.detail.selectedId)
      this.setData({
         pid:e.detail.selectedId
     })
    }else if(e.detail.index == 3){
      this.setData({
        rid:e.detail.selectedId
      })   
    }else if(e.detail.index == 4){
        var arr = e.detail.arr;
        var midarr = [];
        var sidarr = [];
        var tidarr = [];
        var didarr = [];
        arr.forEach(function(item,index){
            if(index == 0){
               midarr.push(item.split("_")[1])
            }else if(index == 2){
              sidarr.push(item.split("_")[1])
            }else if(index == 1){
              tidarr.push(item.split("_")[1])
            }else if(index == 3){
              didarr.push(item.split("_")[1])
            }
        });
        this.setData({
           mid:midarr,
           sid:sidarr,
           tid:tidarr,
           did:didarr
        })
    }
    listarr= [];
    this.setData({
      list:[],
      close_more:false,
      pages:1
    })
    this.onLoad();
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
    console.log("c")
    app.globalData.vr = ""
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    app.globalData.vr = ""
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
      console.log("hahah")
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