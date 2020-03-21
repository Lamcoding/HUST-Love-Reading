const cloud = require('wx-server-sdk')

// <<<<<<< HEAD
cloud.init("env: dinger-3lqz8")
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  await db.collection('users').where({
   openid:event.openid
   }).get().then( res =>{
     if(res.data.length!=0)
     return res   
   })
 
  try {
    return  await db.collection("users").add({
      data: {
        openid:event.openid,
        avatarurl:event.avatarurl,
        nickname: event.nickname,
        book_id:[],
        favorite:[],
      },
      success: function(res){
        console.log("添加成功")
      },
      fail: function(res){
        console.log("添加失败")
      }
    })
  } catch (e) {
  }
}