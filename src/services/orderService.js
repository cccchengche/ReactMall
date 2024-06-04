const defaultList = [
  {
    id: 1,
    userId: 1,
    orderNo: '201801010001',
    createTime: '2018-01-01 00:00:00',
    payTime: '2018-01-01 00:00:00',
    status: 0, // 0,未支付 1已支付 2发货 3确认收货
    price: 100,
    goodId: 1,
  }
]

class OrderService {
  list = [];

  constructor (){
    this._loadData();
  }

  createOrder(userId, goodId, price) {
    const orderNo = new Date().getTime();
    // 从list中找到最大值，生成新的id
    const maxId = this.list.reduce((max, item) => {
      return item.id > max ? item.id : max;
    }, 0);

    const order = {
      id:maxId + 1,
      userId,
      goodId,
      orderNo,
      createTime: new Date().toLocaleString(),
      status: 0,
      price,
    }
    this.list.push(order);
    this._saveData();
    return order;
  }

  payOrder(orderId) {
    const order = this.getOrderById(orderId);
    if (!order) {
      return false;
    }

    order.status = 1;
    order.payTime = new Date().toLocaleString();
    this._saveData();
    return true;
  }

  getOrderById(orderId) {
    return this.list.find(item => item.id === orderId);
  }
  

  // 将数据存入到localstorage中
  _saveData() {
    localStorage.setItem('orderList', JSON.stringify(this.list));
  }

  _loadData() {
    const list = localStorage.getItem('orderList');
    if (list) {
      this.list = JSON.parse(list);
    } else {
      this.list = defaultList;
      this._saveData();
    }
  }
}

const orderService = new OrderService()
export default orderService;