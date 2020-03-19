// pages/sold/sold.js
let tempFilePaths=new Array()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:0,
    price:0,
    location:["沁苑公寓","韵苑公寓","紫菘公寓"],
    index1:0,
    type: ["文学书籍","理科书籍","工科书籍","社科书籍","医学书籍","其他书籍"],
    index2:0,
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
showmodal:function(e){
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
        var user = wx.getStorageSync('userinfo')
        for(var i=0;i<tempFilePaths.length;i++){
          wx.cloud.uploadFile({
            cloudPath: '/Books_image'+new Date().getTime()+user['openid']+'.png',
            filePath:tempFilePaths[i],
            success:function(res){
              fileid.push(res.fileID)
              console.log("fileud",res.fileID)
            }
          })
        }
        console.log("?????",e.detail)
        wx.cloud.callFunction({
          name: 'addbook',
          data:{
          file_id: fileid,
          name: e.detail.title,
          price: e.detail.price,
          note: e.detail.summary,
          type: e.detail.index2,
          location: e.detail.index1,
          user_id: user['_id']
            /*sold.js：  wx.showModel success后需要传给后台数据（表明商品发布成功）
	传入的商品数据有：chooseImg中的tempFilePaths
			detail.title
			detail.price
      detail.summary
			location[index1]（也可只传入index1）
			type[index2](也可只传入index2)
			*/
          },
          success: function(res)
          {
            console.log(res)
          }
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