// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputvalue:'',
  },
  inputBind:function(e){
    this.setData({
      inputvalue: e.detail.value
    })
      console.log("输入数据为"+this.data.inputvalue)
  },
  push:function(){
    var that = this
    wx.request({
      url: '' + this.data.inputvalue + /0/,
      data: {
        inputvalue: this.data.inputvalue
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        var searchData = res.data
        that.setData({
          searchData
        })
        wx.setStorage({
          key: 'searchLists',
          data: {
            searchLists: res.data
          }
        })
        /**
         * 设置 模糊搜索
         */
        if (!that.data.inputvalue) {
          //没有搜索词 友情提示
          wx.showToast({
            title: '请重新输入',
            image: '/images/search404.jpg',
            duration: 2000,
          })
        } else if (searchData.search.length == 0) {
          //搜索词不存在 友情提示
          wx.showToast({
            title: '关键词不存在',
            image: '/images/search404.jpg',
            duration: 2000,
          })
        } else {
          //提取题目关键字 与搜索词进行匹配
          var searchIndex = searchData.search.length
          var d = 0;
          for (var i = 0; i <= searchIndex - 1; i++) {
            var searchTitle = searchData.search[d].title
            console.log(searchTitle)
            d = d + 1;

            for (var x = 0; x <= searchTitle.length; x++) {
              for (var y = 0; y <= searchTitle.length; y++) {
                var keyWord = searchTitle.substring(x, y);
                console.log(keyWord)
              }
            }
            /**
             * 根据关键词 跳转到 search搜索页面
             */
            wx.navigateTo({
              url: '',
            })
          }
        }
      }
    })
  },
  getData: function () {
    wx.cloud.callFunction({
      name: '',
      data: {
        type: 'get'
      },
      success: function (res) {
        console.log("调用成功");
        // 停止下拉动作
        wx.stopPullDownRefresh();
    },
      fail: function () {
        console.log("调用失败");
        wx.stopPullDownRefresh();
      }
    })
},
/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {
  this.getData(); // 这里写自己要调用的查询方法
},
onReachBottom: function () {
    this.setData({
      curPage: this.data.curPage + 1 // 一般上拉触底是为了加载更多分页数据，所以这里页数自增
    });
    this.getGoodsList(this.data.activeCategoryId, true) // 查询方法
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