// 云函数入口文件
const cloud = require('wx-server-sdk')

// <<<<<<< HEAD
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  t= await db.collection('users').where({
    openid:event.openid
  }).get()
  if( t != null )
    return t
  try {
    return await db.collection("users").add({
// =======
// cloud.init("env: dinger-3lqz8")

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()
//   const db = wx.cloud.database()
//   try {
//     return await db.collection('users').add({
// >>>>>>> 613d6bcfe31cd3a55c26878bbafe6bdffa9636b1
      // data 字段表示需新增的 JSON 数据
      data: {
        openid:event.openid,
        avatarurl:event.avatarurl,
        nickname: event.nickname,
// <<<<<<< HEAD
      },
      success: function(res){
        console.log("添加成功")
      },
      fail: function(res){
        console.log("添加失败")
// =======
// >>>>>>> 613d6bcfe31cd3a55c26878bbafe6bdffa9636b1
      }
    })
  } catch (e) {
    console.error(e)
  }
}