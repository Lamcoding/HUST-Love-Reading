const cloud = require('wx-server-sdk')

// <<<<<<< HEAD
cloud.init("env: dinger-3lqz8")
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('users').where({
      openid: event.openid
    }).get()
  } catch (e) {
  }
}