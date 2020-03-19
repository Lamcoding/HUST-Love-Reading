// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = wx.cloud.database()
  try {
    return await db.collection('users').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openid:event.openid,
        avatarurl:event.avatarurl,
        nickname: event.nickname,
      }
    })
  } catch (e) {
    console.error(e)
  }
}