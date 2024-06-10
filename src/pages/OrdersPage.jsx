import React, { useState, useEffect } from 'react';
import { ArrowLeft } from '@nutui/icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, message, Modal } from 'antd';
import '../css/OrdersPage.css';

const OrdersPage = () => {
  return (
    <div>
      <Header />
      <OrderList />
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <ArrowLeft
        className='icon'
        onClick={() => navigate(-1)}
      />
      <span>订单列表</span>
      <div className="header-placeholder"></div>
    </div>
  );
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const match = token.match(/id=(\d+)/);
      if (match) {
        const userId = match[1];
        fetchOrders(userId);
      } else {
        console.error("No ID found in the token string");
      }
    }
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get('http://localhost:8081/api/order/user/ordersWithDetails', {
        params: { userId }
      });
      console.log(response.data);
      if (response.data && response.data.code === 200 && Array.isArray(response.data.data)) {
        setOrders(response.data.data);
      } else {
        console.error('Unexpected response data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.get('http://localhost:8081/api/order/cancel', {
        params: { id: orderId }
      });
      if (response.data && response.data.code === 200) {
        message.success('订单已取消');
        // 更新订单状态为已取消
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
        return (
          <div key={order.id} className="order-item">
            <div className="order-info">
              <div className="order-title">
                订单编号: {order.id}
              </div>
              <div className="order-details">
                <p>下单时间: {formatDate(order.create_time)}</p>
                <p>总金额: ¥{(order.total_fee / 100).toFixed(2)}</p>
                <p>支付方式: {order.payment_type === 1 ? '微信' : order.payment_type === 2 ? '支付宝' : order.payment_type === 3 ? '余额' : '其他'}</p>
                <p>订单状态: {order.status === 0 ? '未支付' : order.status === 1 ? '已支付' : order.status === 2 ? '未发货' : order.status === 3 ? '已发货' : order.status === 4 ? '已完成' : order.status === 5 ? '已取消' : '未知状态'}</p>
              </div>
              <div>
                <Button className='order-btn' onClick={() => handleViewOrder(orderData)}>查看详情</Button>
                {(order.status === 0 || order.status === 1 || order.status === 2) && <Button className='order-btn' onClick={() => handleCancelOrder(order.id)}>取消订单</Button>}
              </div>
            </div>
          </div>
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
