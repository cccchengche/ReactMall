import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router';

import { ServiceContext } from '../contexts/ServiceContext';


const CreateOrderPage = () => {
  const { goodId } = useParams();
  const services = useContext(ServiceContext);
  const navigate = useNavigate();

  const onSubmitClick = () => {
    // 1. 创建订单，拿到orderid
    const parsedGoodId = parseInt(goodId, 10);
    const good = services.good.getGoodById(parsedGoodId);
    if (!good) {
      //TBD 跳转主页
      alert('商品不存在');
      navigate('/home');
      return;
    }
    const order = services.order.createOrder(1, parsedGoodId, good.price)
    // 2. 跳转到支付页面
    alert('下单成功，请支付！');
    navigate(`/pay/${order.id}`);
    
  }

  return <>
    <h1>CreateOrder Page</h1>
    <p> goodId: {goodId}</p>
    <p>你是否要购买？？？？？？</p>
    <button onClick={onSubmitClick}>购买</button>
  </>
}

export default CreateOrderPage;