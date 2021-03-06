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
    bm_name1:"",
    bm_tel1:"",
    broker:"",//经纪人
    qcode:"",//二维码
    lng:"",
    lat:"",
    question:"",
    yelp:"",
    newlist:"",
    hxlist:"",
    show:false,
    showopen:false,
    showcode:false,
    _iflogin:false,
    codename:"",
    autoplay:true,
    interval: 2000,
    duration: 500,
    indicatorDots: true,
    allpicarr:"",
    faces:"../../img/useface.png",
    nowurl:"",
    bigp:false,
    showcode1:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
     var _this = this;
     this.setData({
       houseid:options.id,
       _iflogin:false
     })
     this.getdata()
    
  },
  getdata(){
    var _this = this;
    this.setData({
      _iflogin:false
    })
    var data = {
      id:_this.data.houseid
   }
   zajax.requestAjax('/api/house/photo',data,'post','正在加载',function(res){
    if(res.code == 0){
      var parr = [];
          var nav = [];
          var allpic = [];
          var configarr = res.data.photoType;
          if(res.data.vr.length != 0){
             nav.push("vr");
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
            allpicarr:allpic
          })
    }
   })
   zajax.requestAjax('/api/house/info',data,'post','正在加载',function(res){
      if(res.code == 0){
        res.data.info.tabs = Object.values(res.data.info.tabs);
        res.data.same.forEach(function(item){
          item.tabs = Object.values(item.tabs)
        })
        var new_zuo = [res.data.info.lng,res.data.info.lat]
        _this.setData({
          houseinfo:res.data.info,
          list:res.data.same,
          broker:res.data.broker,
          question:res.data.question,
          newlist:res.data.news,
          yelp:res.data.yelp,
          hxlist:res.data.hxPhoto,
          lng:new_zuo[0],
          lat:new_zuo[1]
        })
        wx.setNavigationBarTitle({
          title: res.data.info.name
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
  callhome:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.id,
      fail:function(){
        return false
      }
    })
  },
  ophaibao:function(e){
      this.setData({
        showcode1:true
      })
  },
  op_code:function(e){
     console.log(e.currentTarget.dataset.tyep)
      if(e.currentTarget.dataset.tyep == 1){
        this.setData({
          bigp:true
        })
      }else{
        this.setData({
          bigp:false
        })
      }
      this.setData({
        qcode:e.currentTarget.dataset.id,
        codename:e.currentTarget.dataset.name,
        showcode:true
      })     
  },
  onClose:function(){
    this.setData({
      showcode:false,
      showcode1:false
    })     
  },
  gotomap:function(){
    wx.navigateTo({
      url:"../tool/map?lng="+this.data.lng+"&lat="+this.data.lat
    })
  },
  gotocont:function(e){
    wx.redirectTo({
      url:"houseinfo?id="+e.currentTarget.dataset.id
    })
  },
  gotohxcont:function(e){
    wx.navigateTo({
      url:"hxcont?id="+this.data.houseid+"&hxid="+e.currentTarget.dataset.id
    })
   },
  gotodtcont:function(e){
    wx.navigateTo({
      url:"dtcont?id="+e.currentTarget.dataset.id+"&houseid="+this.data.houseid
    })
  },
  saveImage(e) {
    var urls = ''
    if(e.currentTarget.dataset.id == 'big'){
      urls = this.data.houseinfo.poster
    }else{
      urls = this.data.qcode
    }
    wx.showLoading({
      title: '保存中...', 
      mask: true,
    });
    console.log(urls)
    wx.downloadFile({
      url:urls,
      success: function(res) {
        if (res.statusCode === 200) {
          let img = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: img,
            success(res) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              });
            },
            fail: function (err) {
              if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
                wx.hideLoading()
                wx.showModal({
                  title: '提示',
                  content: '需要您授权保存相册',
                  showCancel: false,
                  success: modalSuccess => {
                    wx.openSetting({
                      success(settingdata) {
                        console.log("settingdata", settingdata)
                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限成功,再次点击图片即可保存',
                            showCancel: false,
                          })
                        } else {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限失败，将无法保存到相册哦~',
                            showCancel: false,
                          })
                        }
                      },
                      fail(failData) {
                        console.log("failData", failData)
                      },
                      complete(finishData) {
                        console.log("finishData", finishData)
                      }
                    })
                  }
                })
              }
            }
          });
        }
      }
    });
  },
  soucan:function(e){
    var _this = this;
    var data={
      id:this.data.houseid
    }
    zajax.requestAjax('/api/house/followsave',data,'post','正在加载',function(res){
       if(res.code == 0){
         if(_this.data.houseinfo.follow == 0){
          _this.setData({
            'houseinfo.follow':1
          })
         }else{
          _this.setData({
            'houseinfo.follow':0
          })
         }
          
       }else if(res.code == -100){
        _this.setData({
          _iflogin:true
        })
    }
    })
  },
  gotopic:function(e){
    wx.redirectTo({
      url:"pic?id="+this.data.houseid
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
  getCurrentPages: function(){
    　　var pages = getCurrentPages();    //获取加载的页面
    　　var currentPage = pages[pages.length - 1];  //获取当前页面的对象
    　　var url = currentPage.route;  //当前页面url
    　　var options = currentPage.options;   //获取url中所带的参数
    　　//拼接url的参数
    　　var currentPage= url + '?';
    　　for (var key in options) {
    　　　　var value = options[key]
    　　　　currentPage+= key + '=' + value + '&';
    　　}
    　　currentPage= currentPage.substring(0, currentPage.length - 1);
    　　return currentPage;
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
     this.setData({
      nowurl:this.getCurrentPages()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function( options ){
    　　var that = this;
     console.log(this.data.houseinfo.cover)
    　　// 设置转发内容
    　　var shareObj = {
    　　　　title: this.data.houseinfo.name,
    　　　　path: '/pages/newhouse/houseinfo?id='+this.data.houseid, // 默认是当前页面，必须是以‘/’开头的完整路径
           imageUrl:this.data.houseinfo.cover, //转发时显示的图片路径，支持网络和本地，不传则使用当前页默认截图。
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
      url:'more_houseinfo?id='+this.data.houseid
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
  openlp:function(e){
    this.setData({
      showopen:true
 });
  },
  close_bm:function(){
    this.setData({
      show:false
 });
  },
  close_bm1:function(){
    this.setData({
      showopen:false
 });
  },
  gotodtlist:function(){
    wx.navigateTo({
      url:'dtlist?id='+this.data.houseid
    })
  },
  gotohxlist:function(){
    wx.navigateTo({
      url:'hxlist?id='+this.data.houseid
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
  changname1:function(e){
    this.setData({
      bm_name1:e.detail.value
    })
},
changtel1:function(e){
    this.setData({
      bm_tel1:e.detail.value
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
  },
  bm1:function(){
    var _this = this;
    if(this.data.bm_name1 == "" || this.data.bm_tel1 == ""){
      wx.showModal({
        title:"请填写完整资料",
        showCancel:false
      });
      return false
    }
    if(!this.if_mobile(this.data.bm_tel1)){
      wx.showModal({
        title:"请填写正确的手机号",
        showCancel:false
      });
      return false
    }
    var data={
      id:this.data.houseid,
      name:this.data.bm_name1,
      mobile:this.data.bm_tel1
    }
    zajax.requestAjax('/api/house/opennoticesave',data,'post','正在加载',function(res){
        if(res.code == 0){
          wx.showModal({
            title:res.msg,
            showCancel:false,
            success (res) {
              if (res.confirm) {
                _this.setData({
                  showopen: false
                })
              }    
            }
          });
        }
    })
  }
})