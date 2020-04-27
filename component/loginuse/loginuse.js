const app = getApp();
const zajax = require('../../utils/comm.js');
Component({
  properties: {
   
  },
  data: {
  },
  methods: {
    btn_sub:function(res){
      var _this =this;
      console.log(res)
      app.globalData.userInfo = res.detail.userInfo;
      app.globalData.usedata = res.detail;
      console.log(app.globalData.userInfo)
      if (app.globalData.userInfo) {
        wx.login({
          success: res => {
            console.log(res);
            var data={
              code:res.code,
              encryptedData:app.globalData.usedata.encryptedData,
              iv:app.globalData.usedata.iv,
              signature:app.globalData.usedata.signature,
              rawData:app.globalData.usedata.rawData
            }
            zajax.requestAjax('/api/wechat/auth',data,'post','正在加载',function(res){
               if(res.code == 0){                 
                _this.goto()
               }
            })
          }
        })
      } else if (this.data.canIUse){
        app.userInfoReadyCallback = res => {
           console.log(1)
        }
      } else {
        console.log(2)
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
          }
        })
      }
    },
    goto:function(){
      this.triggerEvent("goto", "ok" )
    },
    close:function(){
      this.triggerEvent("goto", "close" )
    }

  }

})