// pages/my/myfavorite/myfavorite.js
// import goods from 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: []
  },
  gotodetail: function(e) {
    console.log("获取的数据",e)
    // wx.navigateTo({
    //   url: '/pages/detail/detail?id='+this.data.detail._id,
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.database().collection('homelist')
      .get()
      .then(res => {
        let detail = res.data
        this.setData({
          detail: detail
        })
        console.log(detail)
      })
      .catch(res => {
        console.log("请求失败", res);
      })
    // console.log(wx.getStorageSync("goodsid"));
    // let savejob = wx.getStorageSync('jobData')//获得缓存
    // let index = savejob.length - 1;
    // console.log(savejob[index].id);
    // let jobid = savejob[index].id
    // let temp = jobList[jobid] //将获得缓存后匹配的数据放入新的数组
    // let job = [];
    // job.push(temp);
    // this.setData({
    //   id: index,
    //   job: job,
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})