import React,{ useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ServiceContext } from '../contexts/ServiceContext';


const PayPage = () => {
  const { orderId } = useParams();
  const services = useContext(ServiceContext);
  const navigate = useNavigate();

  const parsedOrderId = parseInt(orderId, 10);
  const order = services.order.getOrderById(parsedOrderId);

  if (!order) {
    //TBD 跳转主页
    alert('订单不存在');
    navigate('/home');
    return;
  }

  const onPayClick = () => {
    // 1. 支付 
    
    const success = services.order.payOrder(parsedOrderId);
    if (!success) {
      alert('支付失败!');
      return;
    }
    // 2. 跳转到支付成功页面
    alert('支付成功')
    navigate(`/orderDetail/${orderId}`)
  }
/*
{
    id: 1,
    userId: 1,
    orderNo: '201801010001',
    createTime: '2018-01-01 00:00:00',
    payTime: '2018-01-01 00:00:00',
    status: 0,未支付 1已支付 2发货 3确认收货
    total: 100,
    goods: [
        {
            id: 1,
            count: 1
        }
    ],
}
*/
  return <>
    <h1>Pay Page</h1>
    <p> orderId: {orderId}</p>
    <p> orderNo: {order.orderNo}</p>
    <p> createTime: {order.createTime}</p>
    <p> price: {order.price}</p>
    <p> goodId: {order.goodId}</p>
    <button onClick={onPayClick}> 支付！ </button>
  </>
}

export default PayPage;