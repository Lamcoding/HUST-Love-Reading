// pages/sold/sold.js
var tempFilePaths=new Array()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    summary:'',
    title:'',
    price:'',
    location:["沁苑公寓","韵苑公寓","紫菘公寓"],
    index1:0,
    type: ["文学书籍","理科书籍","工科书籍","社科书籍","医学书籍","其他书籍"],
    index2:0,
  },
  bindTitle:function(e){
    this.setData({
      title:e.detail.value
    })
  },
  bindPrice: function (e) {
    this.setData({
      price: e.detail.value
    })
  },
  bindSummary: function (e) {
    this.setData({
      summary: e.detail.value
    })
  },
  chooseImg:function(){
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
         tempFilePaths = res.tempFilePaths
      }
    })
  },
updateLocation:function(e){
  this.setData({
    index1:e.detail.value,
  })
},
updateType:function(e){
  this.setData({
    index2:e.detail.value,
  })
},
showmodal:function(){
  let that = this
  wx.showModal({
    title: '确认出售？',
    content:'一旦确认无法更改',
    showCancel:true,
    confirmText:'确认',
    confirmColor:'#4A7053',
    cancelText:'取消',
    cancelColor:'#4A7053',
    success:function(res){
      if(res.confirm){
        console.log("用户点击确认");
        wx.showToast({
          title: '完成',
          icon:'success',
          duration:2000,
        });
        //获取fileid
        var fileid = new Array()
        var book_id
       // console.log(tempFilePaths)
        var user = wx.getStorageSync('userinfo')
        console.log(user)
        tempFilePaths.forEach((item,index) => {
          wx.cloud.uploadFile({
            cloudPath: 'Books_image/' + new Date().getTime() + user['openid'] + index + '.png',
            filePath: item,
          }).then(function(res){
            fileid.push(res.fileID)
            if(index == tempFilePaths.length - 1)
            {
              console.log("fileid",fileid)
              wx.cloud.callFunction({
                name: 'addbook',
                data: {
                  file_id: fileid,
                  name: that.data.title,
                  price: that.data.price,
                  note: that.data.summary,
                  type: that.data.type[that.data.index2],
                  location: that.data.location[that.data.index1],
                  user_id: user['_id'],
                  openid: user['openid']
                }
              }).then(res => {
                console.log("addbook返回", user)
                wx.cloud.callFunction({
                  name: 'addbook_1',
                  data: {
                    user_id: user['_id'],
                    book_id: res.result._id,
                  //  openid: user['openid']
                  }
                }).then(res => {
                  console.log("addbook_1返回",res)
                })
              }).catch(err => {
                // handle error
              })
            }
          })
        })
      }
      else if(res.cancel){
        console.log("用户点击取消");
      }
    }
  })
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