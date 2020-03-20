//由/index/index.js调用
// 云函数入口文件
const cloud = require('wx-server-sdk')
//云函数的环境
cloud.init("env: dinger-3lqz8", )
//调用云数据库
const db = cloud.database()
// 云函数入口函数，event为传入参数的集合
//context 对象包含了此处调用的调用信息和运行状态，可以用它来了解服务运行的情况
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext().OPENID

  return {
    openid:wxContext
  }

}