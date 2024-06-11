import React from 'react';
import { Button, ConfigProvider,NavBar } from '@nutui/nutui-react';
import { ArrowLeft } from '@nutui/icons-react';
import { useNavigate } from 'react-router';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleBackToOrder = () => {
    navigate('/orders');
  };

  return (
    <ConfigProvider>
      <NavBar
        children="支付状态"
        leftShow
        left={<ArrowLeft onClick={() => navigate('/home')} />}
        // right={<Share />}
        fixed
        style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#fff' }}
      />
      <hr style={{ marginTop: -20, border: 'none', borderBottom: '2px solid #e0e0e0' }} />
      <div style={{ textAlign: 'center', padding: '20px' ,marginTop:'30%'}}>

        <h4>支付成功</h4>
        <br></br>
        <p>感谢您的购买，您的订单已成功支付！</p>
        <div style={{ marginTop: '20px' }}>
          <Button type="primary" onClick={handleBackToHome}>返回首页</Button>
          
        </div>
        <div style={{ marginTop: '8px' }}>
        <Button type="error" style={{backgroundColor:'white',marginLeft:'0px'}} onClick={handleBackToOrder}>查看订单</Button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default PaymentSuccess;
