// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init("env: dinger-3lqz8")
//以下为该函数的调用方法
// cloud.callFunction({
//   name:'addbook',
//   //以下为需要传入的参数 返回的参数见云函数的result
//   data:{
//     file_id,//在上传图书图片后返回的FILEID，以数组形式传入
//     name,//书名
//     type,//书的类型
//     price,//价格
//     note,//添加的备注信息
//   },
//   success:function(res){
//     console.log(res.result)
//   }
// }),

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db= cloud.database()
  //books表插入新记录后返回的唯一标识_id
  try {
    return await db.collection('bookdata').add({
      data: {
        file_id: event.file_id,
        name: event.name,
        type: event.type,
        price: event.price,
        status: "未售出",
        location: event.location,
        user_id: event.user_id,
      },
     success: function (res) {
       console.log(res)
      },
      fail: function(res) {
        console.log(res)
      },
    })
  } catch (e) {}
  // //在users表中更新book_id，
  // db.collection('users').doc(event._id).update({
  //   data: {
  //     book_id: _.addToSet(book_id.data[0].value)
  //   }
  // })
  //以后可通过传入这个_id获取到该书的信息，建议进行缓存
  
}