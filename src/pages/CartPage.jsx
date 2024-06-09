import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Card, Empty, Toast, Loading, NavBar, Cell, InputNumber } from '@nutui/nutui-react';
import { Share, Cart, ArrowLeft, More } from '@nutui/icons-react';
import baseUrl from '../config/config';

const parseTokenString = (tokenString) => {
  const tokenArray = tokenString
    .slice(5, -1) // 去掉前面的 "User(" 和后面的 ")"
    .split(", ") // 按逗号和空格分割
    .map(pair => pair.split("=")); // 按等号分割每一对

  const tokenObject = {};
  tokenArray.forEach(([key, value]) => {
    tokenObject[key] = value;
  });

  return tokenObject;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const tokenString = sessionStorage.getItem('token');
    if (!tokenString) {
      setLoading(false);
      setErrorMessage('您尚未登录，请先登录');
      return;
    }

    let tokenObject;
    try {
      tokenObject = parseTokenString(tokenString);
      // console.log("Parsed tokenObject:", tokenObject);
    } catch (e) {
      console.error("Failed to parse token from sessionStorage", e);
      setLoading(false);
      setErrorMessage('Token解析失败，请重新登录');
      return;
    }

    const userId = tokenObject.id;

    axios.get(`${baseUrl}/api/cart/list?user_id=${userId}`)
      .then(response => {
        if (response.data.code === 200) {
          setCartItems(response.data.data);
        } else {
          setErrorMessage('获取购物车信息失败');
        }
        setLoading(false);
      })
      .catch(error => {
        setErrorMessage('无法获取购物车信息，请稍后再试');
        console.error('Error fetching cart items:', error);
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (id, value) => {
    axios.post(`${baseUrl}/api/cart/update`, { id, num: value })
      .then(response => {
        if (response.data.code === 200) {
          // Toast.show('数量更新成功');
        } else {
          Toast.show('更新数量失败');
        }
      })
      .catch(error => {
        Toast.show('更新数量失败');
        console.error('Error updating cart item quantity:', error);
      });
  };

  const handleCardClick = (id) => {
    navigate(`/detail/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (errorMessage) {
    return (
      <div className="cart-page">
        <Empty description={errorMessage} />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <NavBar
        back={<ArrowLeft onClick={() => navigate(-1)} />}
        right={
          <>
            <span onClick={() => Toast.show('编辑')}>编辑</span>
            <More onClick={() => Toast.show('更多')} />
          </>
        }
        onBackClick={() => navigate(-1)}
      >
        <span onClick={() => Toast.show('购物车')}>购物车</span>
        <i
          style={{ marginLeft: '5px' }}
          className="flex-center"
          onClick={() => Toast.show('购物车')}
        >
          <Cart />
        </i>
      </NavBar>

      {cartItems.length === 0 ? (
        <Empty description="您的购物车为空" />
      ) : (
        <Cell.Group>
          {cartItems.map(item => (
            <Cell key={item.id} onClick={() => handleCardClick(item.item_id)} title={<Card
              src={item.image}
              title={item.name}
              shopDescription="规格"
              delivery={item.spec}
              price={(item.price / 100).toFixed(2)}
              extra={
                <InputNumber
                  defaultValue={item.num}
                  min={1}
                  onChange={(value, e) => {
                    e.stopPropagation(); // 阻止事件传播
                    handleQuantityChange(item.id, value);
                    }}
                />
              }
              />}
            />
          ))}
        </Cell.Group>
      )}
    </div>
  );
};

export default CartPage;
