// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isClick:false,
      goods_info:{
        id:'123',
          picture: [{ img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3438576193,3301397209&fm=27&gp=0.jpg' },
          { img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1525546566,2404337493&fm=27&gp=0.jpg' },
          { img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3028702483,4182396631&fm=27&gp=0.jpg' }
        ],
        title:"2020年二级建造师教材习题全套6本",
        summary:"备注：正版 半新",
        price:"30",
        userava:"/images/demo.jpeg",
        userid:"白银御行",
        userlocation:"紫菘公寓"
      },
      //swiper相关
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    goods:{}
  },
  favorite:function(){
    let goods=this.data.goods_info;
    if(!this.data.isClick){
        wx.setStorageSync(goods.id, goods);
        this.setData({
          isClick:true
        })
    }
    else{
      wx.removeStorageSync(goods.id);
      this.setData({
        isClick:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("详情页接受的id",options)
    // let id=options.id;
    if (wx.getStorageSync(id) != '') {
      this.setData({
        isClick: true
      })
    }
  //以上待完善
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