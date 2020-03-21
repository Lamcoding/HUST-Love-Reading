// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init("env: dinger-3lqz8")

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  let t ={}
  try{
   t= await db.collection('users').doc(event.user_id).update({
    data: {
      book_id: _.addToSet(event.book_id)
    },
    success: function (res) {
      console.log(res)
    },
    fail: function (res) {
      console.log(res)
    },
  })
  }catch(e)
  {
    t = e
  }
  return t
}