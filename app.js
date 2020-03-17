wx.cloud.init({
  env: 'dinger-3lqz8',//环境ID
  traceUser: true,
})
App({
  onLaunch: function () {

  },
  globalData: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
  }
})