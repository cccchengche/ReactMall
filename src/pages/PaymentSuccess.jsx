import React from 'react';
import { Button, ConfigProvider } from '@nutui/nutui-react';
import { useNavigate } from 'react-router';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <ConfigProvider>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>支付成功</h1>
        <p>感谢您的购买，您的订单已成功支付！</p>
        <div style={{ marginTop: '20px' }}>
          <Button type="primary" onClick={handleBackToHome}>返回首页</Button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default PaymentSuccess;
