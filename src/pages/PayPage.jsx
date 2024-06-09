import React from 'react';
import { useParams } from 'react-router';

const PayPage = () => {
  const { orderId } = useParams();

  return (
    <div>
      <h1>支付页面</h1>
      <p>订单ID: {orderId}</p>
    </div>
  );
};

export default PayPage;
