// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init("env: dinger-3lqz8")
//以下为该函数的调用方法
wx.cloud.callFunction({
  name: 'deletebook',
  //以下为需要传入的参数 返回的参数见云函数的result
  data: {
    book_id:book_id
  },
  success: function (res) {
    console.log(res.result)
  }
}),

  // 云函数入口函数
  exports.main = async (event, context) => {
  db = cloud.database();
  try {
    db.collection('books').doc(event.book_id).get({
      success: function(res){
        db.collection('users').where({
          _id:res.data.user_id
        }).update({
          book_id: _.pull(event.book_id)
        })
        wx.cloud.deleteFile({
          fileList: res.data.file_id,
          success: res => {
            console.log(res.fileList)
          },
          fail: err => {
          }
        })
      }
    })
    return await db.collection('books').doc(event.book_id).remove()
  } catch (e) {
    console.error(e)
  }
  }