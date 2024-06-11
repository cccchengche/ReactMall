import React, { useState, useEffect } from 'react';
import { ArrowLeft } from '@nutui/icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, message, Modal } from 'antd';
import '../css/OrdersPage.css';
import { ConfigProvider, Cell, NavBar, Toast } from '@nutui/nutui-react';
import baseUrl from '../config/config';

const OrdersPage = () => {
  return (
    <ConfigProvider>
      <div className="orders-page" style={{ paddingBottom: '60px' }}>
        <Header />
        <OrderList />
      </div>
    </ConfigProvider>
  );
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <NavBar
      back={<ArrowLeft onClick={() => window.history.back()} />}
      onBackClick={() => window.history.back()}
    >
      订单列表
    </NavBar>
  );
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenString = sessionStorage.getItem('token');
    let tokenObject;
    if (tokenString) {
      try {
        tokenObject = parseTokenString(tokenString);
      } catch (e) {
        console.error("Failed to parse token from sessionStorage", e);
      }
    }

    if (tokenObject) {
      const userId = tokenObject.id;
      fetchOrders(userId);
    }
  }, []);

  const parseTokenString = (tokenString) => {
    const tokenArray = tokenString
      .slice(5, -1)
      .split(", ")
      .map(pair => pair.split("="));

    const tokenObject = {};
    tokenArray.forEach(([key, value]) => {
      tokenObject[key] = value;
    });

    return tokenObject;
  };

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/api/order/user/ordersWithDetails`, {
        params: { userId }
      });
      if (response.data && response.data.code === 200 && Array.isArray(response.data.data)) {
        // 对订单数据按创建时间进行排序，最新的在最上面
        const sortedOrders = response.data.data.sort((a, b) => new Date(b.order.create_time) - new Date(a.order.create_time));
        setOrders(sortedOrders);
      } else {
        console.error('Unexpected response data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching orders', error);
      Toast.show('获取订单信息失败');
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.get(`${baseUrl}/api/order/cancel`, {
        params: { id: orderId }
      });
      if (response.data && response.data.code === 200) {
        message.success('订单已取消');
        setOrders(prevOrders => prevOrders.map(order =>
          order.order.id === orderId ? { ...order, order: { ...order.order, status: 5 } } : order
        ));
      } else {
        message.error('取消订单失败');
      }
    } catch (error) {
      message.error('取消订单失败: ' + (error.message || '未知错误'));
      console.error(error);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="order-list">
      {orders.map((orderData) => {
        const order = orderData.order;
        const orderDetails = orderData.orderDetails;
        return (
          <Cell key={order.id} title={`订单号: ${order.id}`}>
            <div className="order-info">
              <div className="order-title">
                <span>{order.id}</span>
                <span style={{ fontSize: '18px' }}>
                  {(order.status === 0 || order.status === 1) ? 
                    <span onClick={() => navigate(`/pay/${order.id}`)} style={{ color: 'red' }}>未支付</span> :
                    order.status === 2 ? <span style={{ color: 'green' }}>已支付</span> :
                    order.status === 3 ? '未发货' :
                    order.status === 4 ? '已发货' :
                    order.status === 6 ? '已完成' :
                    order.status === 5 ? '已取消' : '未知状态'}
                </span>
              </div>
              <div className="order-details">
                <div>
                  <p>¥{(order.total_fee / 100).toFixed(2)}</p>
                  <p>支付方式: {order.payment_type === 1 ? '微信' : order.payment_type === 2 ? '支付宝' : order.payment_type === 3 ? '余额' : '其他'}</p>
                  <p>下单时间: {formatDate(order.create_time)}</p>
                  <div>
                    <Button onClick={() => handleViewOrder(orderData)}>查看详情</Button>
                    {(order.status === 0 || order.status === 1 || order.status === 2) && 
                      <Button onClick={() => handleCancelOrder(order.id)}>取消订单</Button>}
                  </div>
                </div>
                <img style={{ width: '100px' }} src={orderDetails[0].image} alt="" />
              </div>
            </div>
          </Cell>
        );
      })}

      <Modal
        title="订单详情"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>关闭</Button>
        ]}
      >
        {selectedOrder && (
          <div>
            <p><strong>订单编号:</strong> {selectedOrder.order.id}</p>
            <p><strong>创建时间:</strong> {formatDate(selectedOrder.order.create_time)}</p>
            <p><strong>用户ID:</strong> {selectedOrder.order.user_id}</p>
            <p><strong>订单金额:</strong> ¥{(selectedOrder.order.total_fee / 100).toFixed(2)}</p>
            <p><strong>订单状态:</strong> {selectedOrder.order.status === 0 ? '未支付' : selectedOrder.order.status === 1 ? '已支付' : selectedOrder.order.status === 2 ? '未发货' : selectedOrder.order.status === 3 ? '已发货' : selectedOrder.order.status === 4 ? '已完成' : selectedOrder.order.status === 5 ? '已取消' : '未知状态'}</p>
            <h3>订单详情</h3>
            {selectedOrder.orderDetails.map(detail => (
              <div key={detail.id}>
                <p><strong>商品名称:</strong> {detail.name}</p>
                <p><strong>数量:</strong> {detail.num}</p>
                <p><strong>价格:</strong> ¥{(detail.price / 100).toFixed(2)}</p>
                <hr />
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrdersPage;
