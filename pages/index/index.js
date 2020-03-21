// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    swiperImg: [
      "/images/swiper1.png",
      "/images/swiper2.png",
      "/images/swiper3.png"
    ]
  },
  getMyInfo(res) {
    let info = res;
    console.log(info);
    if (info.detail.userInfo) {
      console.log("点击了同意授权");
      //调用pushuserinfo返回 _id，即数据库中的记录应用，以后请求数据时记得带上_id
    } else {
      console.log("点击了拒绝授权");
    }
  },
  gotoHome: function () {
    wx.reLaunch({
      url: '../home/home'
    })
  },
  getMyInfo: function (res) {
    console.log(res)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success(res) {
        console.log(res.userInfo)
        let info = res;
       //console.log(info);
        if (info.userInfo) {
          console.log("点击了同意授权");
          var userinfo = {};
          //调用pushuserinfo返回 _id，即数据库中的记录应用，以后请求数据时记得带上_id
          wx.cloud.callFunction({
            name: "getopenid",
            success: function (res) {
              let hh = res
              console.log("getopenid返回",hh)
              
              userinfo['nickName'] = info.userInfo.nickName;
              userinfo['avatarUrl'] = info.userInfo.avatarUrl;
              userinfo['openid'] = hh.result.openid;
              wx.cloud.callFunction({
                name:'getuserinfo',
                data:{
                  openid:hh.result.openid
                },
                success:function(useless){
                  console.log("getuserinfo返回",useless)
                  if(useless.result.data.length == 0){
                  wx.cloud.callFunction({
                    name: "pushuserinfo",
                    data: {
                      openid: hh.result.openid,
                      avatarurl: info.userInfo.avatarUrl,
                      nickname: info.userInfo.nickName,
                    },
                    success: function (h) {
                      console.log("pushuserinfo返回", h)
                      userinfo['_id'] = h.result._id;
                      wx.setStorageSync('userinfo', userinfo);
                      console.log("user_id", userinfo['_id'])
                    },
                  })}
                  else{
                    userinfo['_id'] = useless.result.data[0]._id;
                    wx.setStorageSync('userinfo', userinfo);
                  }
                 
                }
              })
            }
          })
        } else {
          console.log("点击了拒绝授权");
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