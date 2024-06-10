import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Card, Empty, Toast, Loading, NavBar, Cell, InputNumber, Swipe, Button, Checkbox, Tag } from '@nutui/nutui-react';
import { Share, Cart, ArrowLeft, More, Del } from '@nutui/icons-react';
import baseUrl from '../config/config';
import '../css/CartPage.css';

const parseTokenString = (tokenString) => {
  const tokenArray = tokenString
    .slice(5, -1)
    .split(", ")
    .map(pair => pair.split("="));

  const tokenObject = {};
  tokenArray.forEach(([key, value]) => {
    tokenObject[key] = value;
  });

  return tokenObject;
};

const divNode = (text, style, onClick) => {
  return (
    <div
      style={{
        width: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      onClick={onClick}
    >
      <Del style={{ marginBottom: '8px' }}/>
      <>{text}</>
    </div>
  );
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);  // 新增状态
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
          Toast.show('数量更新成功');
        } else {
          Toast.show('更新数量失败');
        }
      })
      .catch(error => {
        Toast.show('更新数量失败');
        console.error('Error updating cart item quantity:', error);
      });
  };

  const handleDelete = (id) => {
    axios.get(`${baseUrl}/api/cart/delete`, { params: { id } })
      .then(response => {
        if (response.data.code === 200) {
          setCartItems(cartItems.filter(item => item.id !== id));
          Toast.show('删除成功');
        } else {
          Toast.show('删除失败');
        }
      })
      .catch(error => {
        Toast.show('删除失败');
        console.error('Error deleting cart item:', error);
      });
  };

  const handleCardClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      Toast.show('请选择商品');
      return;
    }
    navigate('/createOrder', { state: { selectedItems } });
  };

  const handleSelectItem = (itemId, itemPrice) => {
    setSelectedItems((prev) => {
      const updatedSelectedItems = prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId];
      const updatedTotalPrice = updatedSelectedItems.includes(itemId)
        ? totalPrice + itemPrice
        : totalPrice - itemPrice;
      setTotalPrice(updatedTotalPrice);
      return updatedSelectedItems;
    });
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
      setTotalPrice(0);
    } else {
      const allItemIds = cartItems.map(item => item.id);
      const total = cartItems.reduce((sum, item) => sum + item.price * item.num, 0);
      setSelectedItems(allItemIds);
      setTotalPrice(total);
    }
    setIsAllSelected(!isAllSelected);
  };

  return (
    <div className="cart-page">
      <div className="cart-head">
        <NavBar
          back={<ArrowLeft onClick={() => navigate(0)} />}
          right={
            <>
              <span onClick={() => Toast.show('编辑')}>编辑</span>
              <More onClick={() => Toast.show('更多')} />
            </>
          }
          onBackClick={() => navigate(-1)}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Cart style={{ marginRight: '10px', color: 'red' }} />
            <span onClick={() => Toast.show('购物车')}>购物车</span>
          </div>
        </NavBar>
      </div>
      {loading ? (
        <Loading />
      ) : errorMessage ? (
        <div>
          <Empty description={errorMessage} />
        </div>
      ) : cartItems.length === 0 ? (
        <Empty description="您的购物车为空" />
      ) : (
            <>
            <div style={{ paddingBottom: '70px' }}>
              <Cell.Group>
                {cartItems.map((item, index) => {
                  const specs = JSON.parse(item.spec);
                  const specText = Object.entries(specs).map(([key, value]) => `${value}`).join(', ');

                  return (
                    <Swipe
                      key={item.id}
                      style={{ height: '100%' }}
                      rightAction={
                        <div
                          style={{
                            height: 'inherit',
                            width: '240px',
                            display: 'flex',
                            fontSize: '12px',
                          }}
                        >
                          <>
                            {divNode('设置常买', {
                              background: '#F8F8F8',
                              color: '#1A1A1A',
                            })}
                            {divNode('移入收藏', {
                              background: '#ffcc00',
                              color: '#FFF',
                            })}
                            {divNode('看相似', {
                              background: '#FF860D',
                              color: '#FFF',
                            })}
                            {divNode('删除', {
                              background: '#FA2C19',
                              color: '#FFF',
                            }, () => handleDelete(item.id))}
                          </>
                        </div>
                      }
                    >
                      <Cell>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                          }}
                        >
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onChange={(e) => {
                              handleSelectItem(item.id, item.price);
                            }}
                          />
                          <Card
                            src={item.image}
                            title={item.name}
                            description={
                              <div style={{ fontSize: '14px', padding: '10px 0', color: '#999' }}>
                                {specText}
                              </div>
                            }
                            price={(item.price / 100).toFixed(2)}
                            onClick={() => handleCardClick(item.item_id)}
                          />
                          <InputNumber
                            style={{ float: 'right' }}
                            defaultValue={item.num}
                            min={1}
                            onChange={(value, e) => {
                              e.stopPropagation();
                              handleQuantityChange(item.id, value);
                            }}
                          />
                        </div>
                      </Cell>
                    </Swipe>
                  );
                })}

              </Cell.Group>
              </div>
              <div className='sumup' style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '18px', color: 'red' }}>总金额: ¥{(totalPrice/100).toFixed(2)}</div>
                <Button type="primary" style={{marginRight:'-90px'}} onClick={handleSelectAll} >
                  {isAllSelected ? '取消全选' : '全选'}
                </Button>
                <Button type="primary" onClick={handleCheckout}>
                  结算
                </Button>
              </div>
            </>
          )}
    </div>
  );
};

export default CartPage;


