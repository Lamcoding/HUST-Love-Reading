// pages/home/home.js
var leftdata = []; //左容器图片
var rightdata = []; //右容器图片
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputvalue: '',
    location: ["不限地点", "沁苑公寓", "韵苑公寓", "紫菘公寓"],
    index1: 0,
    type: ["不限类型", "文学书籍", "理科书籍", "工科书籍", "社科书籍", "医学书籍", "其他书籍"],
    index2: 0,
    userlist:[],
    datalist: [],
    imgList: [],
    dataLeft: [], //左容器图片
    dataRight: [], //右容器图片
    lHeight: 0, //左容器高
    rHeight: 0, //右容器高
    imgWidth: 0, //图片宽
  },
  imgLoad: function(e) {
    let datalist=this.data.datalist;
    let imgList = this.data.imgList;
    //图片原始宽度
    let beforeWidth = e.detail.width;
    //图片原始高度
    let beforeHeight = e.detail.height;
    //图片显示的宽度
    let nowWidth = this.data.imgWidth;
    //比例=图片原始宽度/图片显示的宽度
    let wProportion = beforeWidth / nowWidth;
    //图片显示的高度=图片原始高度/比例
    let imgHeight = beforeHeight / wProportion;
// console.log("测试数据为",e)
    //当左区域高=右区域高   或   当左区域高<右区域高
    if (this.data.lHeight == this.data.rHeight || this.data.lHeight < this.data.rHeight) {
      leftdata.push(datalist[e.target.dataset.index])
      this.setData({
        lHeight: this.data.lHeight + imgHeight
      })
      // console.log("左高",imgHeight)
      //当左区域高>右区域高
    } else if (this.data.lHeight > this.data.rHeight) {
      rightdata.push(datalist[e.target.dataset.index])
      this.setData({
        rHeight: this.data.rHeight + imgHeight
      })
    }
    //当完成最后一次分组时        
    if (e.target.dataset.index == this.data.imgList.length - 1) {
      this.setData({
        dataLeft: leftdata,
        dataRight: rightdata,
        imgList: []
      })
    }
  },
  gotodetail:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.item._id,
    })
  },
  inputBind: function(e) {
    this.setData({
      inputvalue: e.detail.value
    })
    console.log("输入数据为" + this.data.inputvalue)
  },
  push: function() {
    var that = this
    wx.request({
      url: '' + this.data.inputvalue + /0/,
      data: {
        inputvalue: this.data.inputvalue
      },
      method: 'GET',
      success: function(res) {
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
  getData: function() {
    wx.cloud.callFunction({
      name: '',
      data: {
        type: 'get'
      },
      success: function(res) {
        console.log("调用成功");
        // 停止下拉动作
        wx.stopPullDownRefresh();
      },
      fail: function() {
        console.log("调用失败");
        wx.stopPullDownRefresh();
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getData(); // 这里写自己要调用的查询方法
  },
  onReachBottom: function() {
    this.setData({
      curPage: this.data.curPage + 1 // 一般上拉触底是为了加载更多分页数据，所以这里页数自增
    });
    this.getGoodsList(this.data.activeCategoryId, true) // 查询方法
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.database().collection('bookdata')
      .get()
      .then(res => {
        console.log("获取数据成功", res)
        this.setData({
          datalist: res.data,
        })
        let imgList = this.data.datalist.map(obj => {
          return obj.file_id[0]
        })
        this.setData({
          imgList: imgList
        })
        // console.log("获取图片为",this.data.imgList)
      })
      .catch(res => {
        console.log("获取数据失败", res)
      })
    wx.cloud.database().collection('users')
      .get()
      .then(res => {
        console.log("获取数据成功", res)
        this.setData({
          userlist: res.data,
        })
      })
      .catch(res => {
        console.log("获取数据失败", res)
      })
    var that = this;
    //获取设备参数
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          imgWidth: res.windowWidth * 0.48,
        })
      },
    })
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