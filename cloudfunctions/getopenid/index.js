//由/index/index.js调用
// 云函数入口文件
const cloud = require('wx-server-sdk')
//云函数的环境
<<<<<<< HEAD
cloud.init()
=======
cloud.init("env: dinger-3lqz8", )
>>>>>>> 613d6bcfe31cd3a55c26878bbafe6bdffa9636b1
//调用云数据库
const db = cloud.database()
// 云函数入口函数，event为传入参数的集合
//context 对象包含了此处调用的调用信息和运行状态，可以用它来了解服务运行的情况
exports.main = async (event, context) => {
<<<<<<< HEAD
  const wxContext = cloud.getWXContext().OPENID

  return {
    openid:wxContext
  }
=======
  const wxContext = cloud.getWXContext().userInfo
  return wx.getUserInfo({
    success(res) {
      console.log(res.userInfo)
    }
  })
>>>>>>> 613d6bcfe31cd3a55c26878bbafe6bdffa9636b1
}