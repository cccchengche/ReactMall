import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { NavBar, Cell, Button, Toast, Card, ConfigProvider, Price } from '@nutui/nutui-react';
import { ArrowLeft } from '@nutui/icons-react';
import axios from 'axios';
import baseUrl from '../config/config';

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

const CreateOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems } = location.state || { selectedItems: [] };
  const [address, setAddress] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const tokenString = sessionStorage.getItem("token");
    let tokenObject;
    if (tokenString) {
      try {
        tokenObject = parseTokenString(tokenString);
      } catch (e) {
        console.error("Failed to parse token from sessionStorage", e);
      }
    }

    if (tokenObject) {
      const userId = tokenObject.id;

      // Fetch default address
      axios.get(`${baseUrl}/api/address/get?userId=${userId}`)
        .then(response => {
          if (response.data.code === 200) {
            const defaultAddress = response.data.data.find(addr => addr.isDefault === "1");
            setAddress(defaultAddress);
          } else {
            Toast.show('获取地址信息失败');
          }
        })
        .catch(error => {
          console.error('Error fetching address:', error);
          Toast.show('获取地址信息失败');
        });

      // Fetch product details
      axios.post(`${baseUrl}/api/cart/find`, { ids: selectedItems })
        .then(response => {
          if (response.data.code === 200) {
            setProducts(response.data.data);
          } else {
            Toast.show('获取商品信息失败');
          }
        })
        .catch(error => {
          console.error('Error fetching product details:', error);
          Toast.show('获取商品信息失败');
        });
    }
  }, [selectedItems]);

  const handleSubmitOrder = () => {
    if (!address) {
      Toast.show('请选择地址');
      return;
    }

    const requestData = {
      cart_ids: selectedItems,
      address_id: address.id
    };

    axios.post(`${baseUrl}/api/order/create`, requestData)
      .then(response => {
        if (response.data.code === 200) {
          Toast.show('订单创建成功');
          const orderId = response.data.data.order_id;
          navigate(`/pay/${orderId}`);
        } else {
          Toast.show('订单创建失败');
        }
      })
      .catch(error => {
        console.error('Error creating order:', error);
        Toast.show('订单创建失败');
      });
  };

  return (
    <ConfigProvider>
      <div className="create-order-page" style={{ paddingBottom: '60px' }}>
        <NavBar
          back={<ArrowLeft onClick={() => window.history.back()} />}
          onBackClick={() => window.history.back()}
        >
          创建订单
        </NavBar>

        {address ? (
          <Cell
            title="目的地址"
            description={`${address.province} ${address.city} ${address.town} ${address.street} ${address.contact} ${address.mobile}`}
          />
        ) : (
          <Cell title="加载地址信息中..." />
        )}

        {products.length > 0 ? (
          products.map((item, index) => {
            const specs = JSON.parse(item.spec);
            const specText = Object.entries(specs).map(([key, value]) => `${value}`).join(', ');

            return (
              <Cell key={index}>
                <Card
                  src={item.image}
                  title={item.name}
                  price={(item.price / 100).toFixed(2)}
                  description={
                    <div style={{ fontSize: '14px', padding: '10px 0', color: '#999' }}>
                      {specText}
                    </div>
                  }
                  extra={<div style={{ fontSize: '12px' }}>数量: {item.num}</div>}
                />
              </Cell>
            );
          })
        ) : (
          <Cell title="加载商品信息中..." />
        )}

        <div className="order-footer" style={footerStyle}>
          <div style={{ flex: 1, paddingLeft: '16px' }}>
            订单合计:<Price price={(products.reduce((total, product) => total + (product.price * product.num), 0) / 100).toFixed(2)} size="normal" thousands />
          </div>
          <Button type="primary" onClick={handleSubmitOrder} style={{ flex: 'none', margin: '0 16px', width: 'auto' }}>
            提交订单
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
};

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderTop: '1px solid #ebebeb',
  padding: '10px 0',
  boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
};

export default CreateOrder;
