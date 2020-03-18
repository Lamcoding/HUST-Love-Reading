// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init("env: dinger-3lqz8")

class Search {
  constructor(book) {
    this.book = book;
  }
  search(arg) {
    var score = [];
    for (var i = 0; i < book.length; i++) {
      var temp = {
        'id': this.book[i]['id'],
        's': ((this.book[i]['name']).length),
        'name': (this.book[i]['name'])
      };
      temp['s'] += this.important(arg, book[i]);
      score.push(temp);
    }
    score.sort(function (a, b) {
      if (a['s'] < b['s']) {
        return -1;
      } else if (a['s'] > b['s']) {
        return 1;
      } else {
        return 0;
      }
    })
    let sorted = [];
    for (let i = 0; i < score.length; i++) {
      if (score[i]['s'] < 0) {
        sorted.push({
          'id': score[i]['id'],
          'name': score[i]['name']
        });
      }
    }
    return sorted;
  }
  important(args, element) {
    if (element['name'].match(args) != null) {
      return -1000;
    } else {
      var mark = 0;
      for (var x in args) {
        if (element['name'].match(args) != null) {
          mark -= 10;
        }
      }
      return mark;
    }
  }
}


// 云函数入口函数
exports.main = async (event, context) => {
  res = wx.cloud.database().collection('books').get();
  info = new Search(res).search(event.inputvalue);
  return info;
}

function search_keyword(arg) {
  return wx.cloud.callFunction({
    // 云函数名称
    name: "searchbook",
    // 传给云函数的参数
    data: {
      a: arg,
    },
    success: function (res) {
      console.log(res)
    },
    fail: console.error
  });
}
