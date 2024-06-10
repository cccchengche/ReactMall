import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { NavBar, Toast, Cell, Price, CountDown, ConfigProvider, Button } from '@nutui/nutui-react';
import { ArrowLeft, Share } from '@nutui/icons-react';
import axios from 'axios';
import baseUrl from '../config/config';

const PayPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isTimeout, setIsTimeout] = useState(false);
  const countdownRef = useRef(null);

  useEffect(() => {
    console.log(`Fetching order details for ID: ${orderId}`);

    axios.get(`${baseUrl}/api/order/getbyid?id=${orderId}`)
      .then(response => {
        if (response.data.code === 200) {
          const orderData = response.data.data;
          setOrderDetails(orderData);

          console.log(`Order Data: ${JSON.stringify(orderData)}`);
        } else {
          Toast.show('获取订单详情失败');
          console.error('Failed to fetch order details:', response.data.msg);
        }
      })
      .catch(error => {
        Toast.show('获取订单详情失败');
        console.error('Error fetching order details:', error.message);
      });
  }, [orderId]);

  const handleCountdownEnd = () => {
    setIsTimeout(true);
    Toast.show('订单已超时，自动取消');
    cancelOrder();
  };

  const handlePayment = () => {
    const cartIds = JSON.parse(localStorage.getItem('cart_ids'));
    
    axios.post(`${baseUrl}/api/order/pay`, { id: orderId, cart_ids: cartIds })
      .then(response => {
        if (response.data.code === 200) {
          Toast.show('支付成功');
          localStorage.removeItem('cart_ids');
          
          navigate('/payment-success');
        } else {
          Toast.show('支付失败');
          console.error('Failed to process payment:', response.data.msg);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 500) {
          Toast.show('余额不足');
        } else {
          Toast.show('支付失败');
        }
        console.error('Error processing payment:', error.message);
      });
    
    const storedTokenObject = JSON.parse(sessionStorage.getItem("tokenObject"));
    const phone = storedTokenObject.phone;
    const password = storedTokenObject.password;
    
    axios.post(`${baseUrl}/api/user/login`, { phone, password })
      .then(response => {
        // console.log('修改token',response.data);
        if (response.data.code === 200) {
          sessionStorage.setItem('token', response.data.data.token);
        } else {
          setErrorMessage('登录失败，请检查您的手机号和密码');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const cancelOrder = () => {
    axios.post(`${baseUrl}/api/order/close`, { orderId })
      .then(response => {
        if (response.data.code === 200) {
          Toast.show('订单已关闭');
        } else {
          Toast.show('订单关闭失败');
          console.error('Failed to close order:', response.data.msg);
        }
      })
      .catch(error => {
        Toast.show('订单关闭失败');
        console.error('Error closing order:', error.message);
      });
  };

  const parseDateString = (dateString) => new Date(dateString).getTime();
  const endTime = orderDetails ? parseDateString(orderDetails.create_time) + 10 * 60 * 1000 : Date.now();
  const remainingTime = endTime - Date.now();

  return (
    <ConfigProvider>
      <div>
        <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
          <NavBar
            titleAlign="center"
            back={<ArrowLeft onClick={() => navigate(-1)} />}
            right={<span className="flex-center" onClick={() => Toast.show('分享')}><Share /></span>}
            onBackClick={() => navigate(-1)}
          >
            收银台
          </NavBar>
        </div>
        
        <div style={{ paddingTop: '60px' }}>
          {isTimeout ? (
            <p>订单已超时，自动取消</p>
          ) : orderDetails ? (
            <div>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <div style={{ display: 'inline-block' }}>
                  <Price price={orderDetails.total_fee / 100} />
                </div>
                <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                  <CountDown
                    ref={countdownRef}
                    remainingTime={remainingTime}
                    onEnd={handleCountdownEnd}
                    format="mm:ss"
                  />
                </div>
              </div>
              <Cell title="订单ID" description={orderDetails.id} />
              <Cell title="支付类型" description={orderDetails.payment_type === 1 ? '支付宝' : orderDetails.payment_type === 2 ? '微信' : '扣减余额'} />
              <Cell title="创建时间" description={orderDetails.create_time} />
              <Cell title="支付时间" description={orderDetails.pay_time || '未支付'} />
              <Cell title="发货时间" description={orderDetails.consign_time || '未发货'} />
              <Cell title="交易完成时间" description={orderDetails.end_time || '未完成'} />
              <Cell title="交易关闭时间" description={orderDetails.close_time || '未关闭'} />
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button type="primary" onClick={handlePayment}>确认支付</Button>
              </div>
            </div>
          ) : (
            <p>加载订单信息中...</p>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default PayPage;
