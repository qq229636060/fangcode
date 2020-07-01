// pages/newhouse/hxlist.js
const zajax = require('../../utils/comm.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act:0,
    houseid:"",
    hxdata:"",
    allhx:""
  },
  select:function(e){
    console.log(e.currentTarget.dataset.id)
    var tiaojian = e.currentTarget.dataset.s;
    var hxlist = this.data.allhx;
    var tmparr = [];
    hxlist.forEach(function(item,index){
        if(item.shi == tiaojian.shi){
          tmparr.push(item)
        }
    }) 
    if(tmparr != ''){
      this.setData({
        act:e.currentTarget.dataset.id,
        'hxdata.photo':tmparr
      });
    }else{
      this.setData({
        act:e.currentTarget.dataset.id
      });
      this.getdata()
    }
   
 },
 gotohxcont:function(e){
  wx.navigateTo({
    url:"hxcont?id="+this.data.houseid+"&hxid="+e.currentTarget.dataset.id
  })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this = this;
      this.setData({
        houseid:options.id
      })
      this.getdata();
  },
  getdata(){
    var _this= this;
    var data ={
      id:this.data.houseid,
      tab:1
   }
   zajax.requestAjax('/api/house/hx',data,'post','正在加载',function(res){
      if(res.code == 0){
         _this.setData({
           hxdata:res.data,
           allhx:res.data.photo
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
      title: '全部户型'
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
  onShareAppMessage: function( options ){
    　　var that = this;
     console.log(this.data.houseinfo.cover)
    　　// 设置转发内容
    　　var shareObj = {
    　　　　title: '全部户型',
    　　　　path: '', // 默认是当前页面，必须是以‘/’开头的完整路径
           imageUrl:'', //转发时显示的图片路径，支持网络和本地，不传则使用当前页默认截图。
    　　　　success: function(res){　 // 转发成功之后的回调　　　　　
    　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
                  console.log(this.data.houseinfo.cover)
    　　　　　　}
    　　　　},
    　　　　fail: function(){　// 转发失败之后的回调
    　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
    　　　　　　　　// 用户取消转发
    　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
    　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
    　　　　　　}
    　　　　},
    　　　　complete: function(){
    　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
    　　　　}
    　　};
    　　// 来自页面内的按钮的转发
    　　if( options.from == 'button' ){
    　　　　var dataid = options.target.dataset; //上方data-id=shareBtn设置的值
    　　　　// 此处可以修改 shareObj 中的内容
    　　　　shareObj.path = '/pages/btnname/btnname?id='+dataid.id;
    　　}
    　　// 返回shareObj
    　　return shareObj;
    },
})