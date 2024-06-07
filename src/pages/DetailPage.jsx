import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { Popup, Button, Form, InputNumber, Toast } from '@nutui/nutui-react';
import baseUrl from '../config/config';

const DetailPage = () => {
  const { goodId } = useParams();
  const parsedGoodId = parseInt(goodId, 10);
  const navigate = useNavigate();
  const [good, setGood] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.get(`${baseUrl}/api/item/detail?id=${parsedGoodId}`)
      .then(response => {
        if (response.data.code === 200) {
          setGood(response.data.data);
        } else {
          setErrorMessage('获取商品信息失败');
          navigate('/home');
        }
      })
      .catch(error => {
        setErrorMessage('无法获取商品信息，请稍后再试');
        console.error('Error fetching product details:', error);
        navigate('/home');
      });
  }, [parsedGoodId, navigate]);

  const onBuyClick = () => {
    navigate(`/createOrder/${goodId}`);
  }

  const onAddToCartClick = () => {
    setShowPopup(true);
  }

  const handleConfirm = (values) => {
    // 发送请求到后端添加到购物车的逻辑可以在这里实现
    // 目前先显示一个Toast消息
    Toast.show({ content: `已添加 ${values.quantity} 件商品到购物车`, icon: 'success' });
    setShowPopup(false);
  }

  if (!good) {
    return <div>加载中...</div>;
  }

  return (
    <>
      <h1>Detail Page</h1>
      <p>goodId: {goodId}</p>
      <p>goodName: {good.name}</p>
      <p>goodPrice: {good.price / 100}元</p>
      <p>goodCategory: {good.category}</p>
      <p>goodBrand: {good.brand}</p>
      <p>goodSpec: {good.spec}</p>
      <p>goodStock: {good.stock}</p>
      <p>goodSold: {good.sold}</p>
      <p>goodCommentCount: {good.comment_count}</p>
      <p>goodStatus: {good.status}</p>
      <p>goodCreateTime: {new Date(good.create_time).toLocaleString()}</p>
      <p>goodUpdateTime: {new Date(good.update_time).toLocaleString()}</p>
      <img src={good.image} alt={good.name} style={{ width: '300px', height: 'auto' }} />
      <button onClick={onBuyClick}>购买</button>
      <button onClick={onAddToCartClick}>添加到购物车</button>
      {errorMessage && <p className="error">{errorMessage}</p>}

      <Popup
        visible={showPopup}
        position="bottom"
        onClose={() => setShowPopup(false)}
        destroyOnClose
      >
        <div style={{ padding: '20px' }}>
          <p>{good.name}</p>
          {/* <p>价格: {good.price / 100}元</p> */}
          <Form
            onFinish={handleConfirm}
            footer={
              <Button type="primary" block nativeType="submit" style={{ marginTop: '20px' }}>
                确认
              </Button>
            }
          >
            <Form.Item name="goodId" initialValue={goodId} hidden>
              <input type="hidden" />
            </Form.Item>
            <Form.Item>
              <label>
                价格:
                <input type="text" value={good.price / 100} readOnly />
              </label>
            </Form.Item>
            <Form.Item
              label="选择数量"
              name="quantity"
              initialValue={1}
              rules={[{ required: true, message: '请选择数量' }]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Form>
        </div>
      </Popup>
    </>
  );
}

export default DetailPage;
