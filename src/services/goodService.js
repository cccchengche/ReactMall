const defaultList = [
  {
    id: 1,
    name: '商品1',
    price: 100,
    categoryId: '1',
    img: 'http://www.baidu.com/1.jpg',
  },
  {
    id: 2,
    name: '商品2',
    price: 200,
    categoryId: '2',
    img: 'http://www.baidu.com/2.jpg',
  },
  {
    id: 3,
    name: '商品3',
    price: 300,
    categoryId: '3',
    img: 'http://www.baidu.com/3.jpg',
  }
]

class GoodService {
  list = [];

  constructor (){
    this._loadData();
  }

  // 根据id获取单个商品
  getGoodById(id) {
    return this.list.find(item => item.id === id);
  }
  
  // 获取商品列表
  getGoodList() {
    return this.list;
  }

  // 添加商品
  addGood(good) {
    this.list.push(good);
    this._saveData();
  }

  // 删除商品
  deleteGood(id) {
    this.list = this.list.filter(item => item.id !== id);
    this._saveData();
  }

  // 更新商品
  updateGood(good) {
    this.list = this.list.map(item => {
      if (item.id === good.id) {
        return good;
      }
      return item;
    });
    this._saveData();
  }


  // 将数据存入到localstorage中
  _saveData() {
    localStorage.setItem('goodList', JSON.stringify(this.list));
  }

  _loadData() {
    const list = localStorage.getItem('goodList');
    if (list) {
      this.list = JSON.parse(list);
    } else {
      this.list = defaultList;
      this._saveData();
    }
  }
}

const goodService = new GoodService()
export default goodService;