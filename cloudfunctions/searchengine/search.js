
const book = require('.\\book.json')
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
                sorted.push({ 'id': score[i]['id'], 'name': score[i]['name'] });
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

/*
console.log(new Search(book).search("高等"));
理论上会输出
[{ id: '26', name: '高等数学' }]


console.log(new Search(book).search("与"));
理论上会输出
[
  { id: '13', name: '我与地坛' },
  { id: '16', name: '告白与告别' },
  { id: '18', name: '行走在爱与恨之间' }
]
*/

function searching() {
    // 1. 获取数据库引用
    const db = wx.cloud.database()
    var book = null;
    db.collection('books').get({
        success: function (res) {
            book = res;
            //注意：我需要返回的res跟此文件夹当中的book.json类型一致
            //为list，当中元素为dict！！
            //请后端同学注意！
        }
    })
    return new Search(book);
}

starting = searching()

//调用时像底下代码一样填入你想搜索的字符串即可瞬间返回搜索结果的id和name,按照相关度排序
//高相关度的排在前面。

console.log(starting.search("高等"))

