// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init("env: dinger-3lqz8")
//以下为该函数的调用方法
wx.cloud.callFunction({
  name: 'updatebookstatus',
  //以下为需要传入的参数 返回的参数见云函数的result
  data: {
    book_id,//书的唯一标识，在addbook里面有返回，建议缓存
    command,//传入0表示状态改为未售出，传入1表示改为已售出
  },
  success: function (res) {
    ////成功则通过 stats.updated得到更新的数量，也就是1
    console.log(res.result)
  },
  fail: function(res){
    //失败返回错误信息
    //类似 ReferenceError: nonExistentFunction is not defined
    console.log(res.errMsg)
  }
}),

  // 云函数入口函数
  exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    if(event.command == 0 )
    try {
      return await db.collection('todos').doc(event.book_id)
      .update({
          data: {
          status:"未售出"
        },
      })
     } catch (e) {
      console.error(e)
      return e
    }
    else if(event.command == 1)
    try {
      return await db.collection('todos').doc(event.book_id)
      .update({
           data: {
           status: "已售出"
          },
         })
     } catch (e) {
      console.error(e)
      return e
    }
  }