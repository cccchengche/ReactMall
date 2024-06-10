import React, { useState, useEffect } from 'react';
import { ArrowLeft } from '@nutui/icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      const response = await axios.get('http://localhost:8081/api/order/user', {
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="order-list">
      {orders.map((order) => (
        <div key={order.id} className="order-item">
          <div className="order-info">
            <div className="order-title">
              订单编号: {order.id}
            </div>
            <div className="order-details">
              <p>下单时间: {formatDate(order.create_time)}</p>
              <p>总金额: ¥{(order.total_fee / 100).toFixed(2)}</p>
              <p>支付方式: {order.payment_type === 1 ? '微信' : order.payment_type === 2 ? '支付宝' : '其他'}</p>
              <p>订单状态: {order.status === 1 ? '未支付' : order.status === 2 ? '已支付' : '其他'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
