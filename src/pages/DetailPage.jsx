// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router';
// import axios from 'axios';
// import { Popup, Button, Form, InputNumber, Toast, Loading, Tag, Price, Collapse, NavBar } from '@nutui/nutui-react';
// import { ArrowLeft, Share, Received, Comment, Cart } from '@nutui/icons-react'; // 导入图标
// import baseUrl from '../config/config';
// import '../css/DetailPage.css'; // 引入自定义的CSS文件

// const parseTokenString = (tokenString) => {
//   const tokenArray = tokenString
//     .slice(5, -1) // 去掉前面的 "User(" 和后面的 ")"
//     .split(", ") // 按逗号和空格分割
//     .map(pair => pair.split("=")); // 按等号分割每一对

//   const tokenObject = {};
//   tokenArray.forEach(([key, value]) => {
//     tokenObject[key] = value;
//   });

//   return tokenObject;
// };

// const DetailPage = () => {
//   const { goodId } = useParams();
//   const parsedGoodId = parseInt(goodId, 10);
//   const navigate = useNavigate();
//   const [good, setGood] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     axios.get(`${baseUrl}/api/item/detail?id=${parsedGoodId}`)
//       .then(response => {
//         if (response.data.code === 200) {
//           setGood(response.data.data);
//         } else {
//           Toast.fail('获取商品信息失败');
//           navigate('/home');
//         }
//         setLoading(false);
//       })
//       .catch(error => {
//         Toast.fail('无法获取商品信息，请稍后再试');
//         console.error('Error fetching product details:', error);
//         navigate('/home');
//         setLoading(false);
//       });
//   }, [parsedGoodId, navigate]);

//   const onBuyClick = () => {
//     navigate(`/createOrder/${goodId}`);
//   }

//   const onAddToCartClick = () => {
//     setShowPopup(true);
//   }

//   const handleConfirm = async (values) => {
//     const tokenString = sessionStorage.getItem('token');
//     let tokenObject = null;

//     if (tokenString) {
//       try {
//         tokenObject = parseTokenString(tokenString);
//       } catch (e) {
//         console.error('Failed to parse token from sessionStorage', e);
//         Toast.fail('请先登录');
//         navigate('/login');
//         return;
//       }
//     }

//     const userId = tokenObject && tokenObject.id;

//     if (!userId) {
//       Toast.fail('请先登录');
//       navigate('/login');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${baseUrl}/api/cart/create`,
//         {
//           user_id: userId,
//           item_id: goodId,
//           num: values.quantity,
//         }
//       );

//       if (response.data.code === 200) {
//         Toast.show({ content: `已添加 ${values.quantity} 件商品到购物车`, icon: 'success' });
//       } else {
//         Toast.fail('添加到购物车失败');
//       }
//     } catch (error) {
//       Toast.fail('添加到购物车失败，请稍后再试');
//       console.error('Error adding to cart:', error);
//     }

//     setShowPopup(false);
//   }

//   if (loading) {
//     return <Loading />;
//   }

//   if (!good) {
//     return <div className="error-message">商品信息加载失败</div>;
//   }

//   const priceInYuan = good.price / 100;
//   const info = good.spec;
//   const color = info["颜色"];
//   const size = info["尺寸"];
//   const version = info["版本"];
//   const chima = info["尺码"];

//   return (
//     <div className="page-container">
//       <div className='navbar'>
//         <NavBar
//           children="商品详情"
//           leftShow
//           left={<ArrowLeft onClick={() => navigate(-1)} />} // 自定义左侧内容
//           right={<Share />} // 自定义右侧内容
//           fixed
//           style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#fff' }} // 确保固定在顶部
//         />
//       </div>

//       <div className="detail-page">
//         <div className="good-info">
//           <img src={good.image} alt={good.name} className="good-image" />

//           <div className="good-price">
//             <div className="tag-container">
//               <Price
//                 price={priceInYuan}
//                 symbol="¥"
//                 digits={2}
//                 thousands={true}
//                 position="before"
//                 size="large"
//                 line={false}
//               />
//               <Tag type="primary" round>优惠价</Tag>
//             </div>
//             <span className="sold-count" style={{ fontSize: 15 }}>已售: {good.sold}</span>
//           </div>
//           <h5>{good.name}</h5>
//           <div className='collapse'>
//             <Collapse>
//               <Collapse.Item title={<span style={{ display: 'flex', alignItems: 'center', marginLeft: '-10px', color: '#002' }}><Received style={{ marginRight: '6px' }} />产品信息 | 分类 | 品牌 | 规格</span>}>
//                 <table className="product-info-table">
//                   <tbody>
//                     <tr>
//                       <td>分类:</td>
//                       <td>{good.category}</td>
//                     </tr>
//                     <tr>
//                       <td>品牌:</td>
//                       <td>{good.brand}</td>
//                     </tr>
//                     <tr>
//                       <td>尺寸:</td>
//                       <td>{size}</td>
//                     </tr>
//                     <tr>
//                       <td>颜色：</td>
//                       <td>{color}</td>
//                     </tr>
//                     <tr>
//                       <td>尺码：</td>
//                       <td>{chima}</td>
//                     </tr>
//                     <tr>
//                       <td>版本：</td>
//                       <td>{version}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </Collapse.Item>
//             </Collapse>
//           </div>
//           <h6 style={{ display: 'flex', alignItems: 'center', marginLeft: '38%' }}>
//             <Comment style={{ marginRight: '5px', color: "#fa2c19" }} />
//             共 {good.comment_count} 条评价
//           </h6>
//         </div>

//         <div className="action-buttons">
//           <div style={{ display: 'flex', justifyContent: 'space-between', width: 400 }}>
//             <Button type="primary" onClick={onBuyClick} style={{ flex: 1, marginRight: '8px', height: '40px' }}><Comment style={{ marginRight: '5px' }} />购买</Button>
//             <Button type="default" onClick={onAddToCartClick} style={{ flex: 1, height: '40px' }}><Cart style={{ marginRight: '5px', size: '90' }} />添加到购物车</Button>
//           </div>
//         </div>

//         {errorMessage && <p className="error">{errorMessage}</p>}

//         <Popup
//           visible={showPopup}
//           position="bottom"
//           onClose={() => setShowPopup(false)}
//           destroyOnClose
//         >
//           <div className="popup-content">
//             <p>{good.name}</p>
//             <Form
//               onFinish={handleConfirm}
//               footer={
//                 <Button type="primary" block nativeType="submit" style={{ marginTop: '20px' }}>
//                   确认
//                 </Button>
//               }
//             >
//               <Form.Item name="goodId" initialValue={goodId} hidden>
//                 <input type="hidden" />
//               </Form.Item>
//               <Form.Item>
//                 <label>
//                   价格:
//                   <input type="text" value={priceInYuan} readOnly />
//                 </label>
//               </Form.Item>
//               <Form.Item
//                 label="选择数量"
//                 name="quantity"
//                 initialValue={1}
//                 rules={[{ required: true, message: '请选择数量' }]}
//               >
//                 <InputNumber min={1} />
//               </Form.Item>
//             </Form>
//           </div>
//         </Popup>
//       </div>
//     </div>
//   );
// }

// export default DetailPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { Popup, Button, Form, InputNumber, Toast, Loading, Tag, Price, Collapse, NavBar } from '@nutui/nutui-react';
import { ArrowLeft, Share, Received, Comment, Cart } from '@nutui/icons-react'; // 导入图标
import baseUrl from '../config/config';
import '../css/DetailPage.css'; // 引入自定义的CSS文件

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

const DetailPage = () => {
  const { goodId } = useParams();
  const parsedGoodId = parseInt(goodId, 10);
  const navigate = useNavigate();
  const [good, setGood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}/api/item/detail?id=${parsedGoodId}`)
      .then(response => {
        if (response.data.code === 200) {
          setGood(response.data.data);
        } else {
          Toast.fail('获取商品信息失败');
          navigate('/home');
        }
        setLoading(false);
      })
      .catch(error => {
        Toast.fail('无法获取商品信息，请稍后再试');
        console.error('Error fetching product details:', error);
        navigate('/home');
        setLoading(false);
      });

    const tokenString = sessionStorage.getItem('token');
    let tokenObject = null;

    if (tokenString) {
      try {
        tokenObject = parseTokenString(tokenString);
      } catch (e) {
        console.error('Failed to parse token from sessionStorage', e);
        Toast.fail('请先登录');
        navigate('/login');
        return;
      }
    }

    const userId = tokenObject && tokenObject.id;

    if (userId) {
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
    }
  }, [parsedGoodId, navigate]);

  const onBuyClick = () => {
    setIsBuying(true);
    setShowPopup(true);
  }

  const onAddToCartClick = () => {
    setIsBuying(false);
    setShowPopup(true);
  }

  const handleInitialConfirm = (values) => {
    setQuantity(values.quantity);
    if (isBuying) {
      setShowPopup(false);
      setShowConfirmPopup(true);
    } else {
      handleCartConfirm(values);
    }
  };

  const handleFinalConfirm = async () => {

    const tokenString = sessionStorage.getItem('token');
    let tokenObject = null;

    if (tokenString) {
      try {
        tokenObject = parseTokenString(tokenString);
      } catch (e) {
        console.error('Failed to parse token from sessionStorage', e);
        Toast.fail('请先登录');
        navigate('/login');
        return;
      }
    }

    const userId = tokenObject && tokenObject.id;

    if (!userId) {
      Toast.fail('请先登录');
      navigate('/login');
      return;
    }

    const requestData = {
      user_id: userId,
      item_id: goodId,
      num: quantity,
      address_id: address.id,
    };

    try {
      const response = await axios.post(`${baseUrl}/api/order/push`, requestData);

      if (response.data.code === 200) {
        Toast.show({ content: `已购买 ${quantity} 件商品`, icon: 'success' });
        navigate('/pay/' + response.data.data.order_id);
        
      } else {
        Toast.fail('购买失败');
      }
    } catch (error) {
      Toast.fail('购买失败，请稍后再试');
      console.error('Error buying:', error);
    }

    setShowConfirmPopup(false);
  };

  const handleCartConfirm = async (values) => {
    const tokenString = sessionStorage.getItem('token');
    let tokenObject = null;

    if (tokenString) {
      try {
        tokenObject = parseTokenString(tokenString);
      } catch (e) {
        console.error('Failed to parse token from sessionStorage', e);
        Toast.fail('请先登录');
        navigate('/login');
        return;
      }
    }

    const userId = tokenObject && tokenObject.id;

    if (!userId) {
      Toast.fail('请先登录');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/cart/create`, {
        user_id: userId,
        item_id: goodId,
        num: values.quantity,
      });

      if (response.data.code === 200) {
        Toast.show({ content: `已添加 ${values.quantity} 件商品到购物车`, icon: 'success' });
      } else {
        Toast.fail('添加到购物车失败');
      }
    } catch (error) {
      Toast.fail('添加到购物车失败，请稍后再试');
      console.error('Error adding to cart:', error);
    }

    setShowPopup(false);
  }

  if (loading) {
    return <Loading />;
  }

  if (!good) {
    return <div className="error-message">商品信息加载失败</div>;
  }

  const priceInYuan = good.price / 100;
  const info = good.spec;
  const color = info["颜色"];
  const size = info["尺寸"];
  const version = info["版本"];
  const chima = info["尺码"];

  return (
    <div className="page-container">
      <div className='navbar'>
        <NavBar
          children="商品详情"
          leftShow
          left={<ArrowLeft onClick={() => navigate(-1)} />}
          right={<Share />}
          fixed
          style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#fff' }}
        />
      </div>

      <div className="detail-page">
        <div className="good-info">
          <img src={good.image} alt={good.name} className="good-image" />

          <div className="good-price">
            <div className="tag-container">
              <Price
                price={priceInYuan}
                symbol="¥"
                digits={2}
                thousands
                position="before"
                size="large"
                line={false}
              />
              <Tag type="primary" round>优惠价</Tag>
            </div>
            <span className="sold-count" style={{ fontSize: 15 }}>已售: {good.sold}</span>
          </div>
          <h5>{good.name}</h5>
          <div className='collapse'>
            <Collapse>
              <Collapse.Item title={<span style={{ display: 'flex', alignItems: 'center', marginLeft: '-10px', color: '#002' }}><Received style={{ marginRight: '6px' }} />产品信息 | 分类 | 品牌 | 规格</span>}>
                <table className="product-info-table">
                  <tbody>
                    <tr>
                      <td>分类:</td>
                      <td>{good.category}</td>
                    </tr>
                    <tr>
                      <td>品牌:</td>
                      <td>{good.brand}</td>
                    </tr>
                    <tr>
                      <td>尺寸:</td>
                      <td>{size}</td>
                    </tr>
                    <tr>
                      <td>颜色：</td>
                      <td>{color}</td>
                    </tr>
                    <tr>
                      <td>尺码：</td>
                      <td>{chima}</td>
                    </tr>
                    <tr>
                      <td>版本：</td>
                      <td>{version}</td>
                    </tr>
                  </tbody>
                </table>
              </Collapse.Item>
            </Collapse>
          </div>
          <h6 style={{ display: 'flex', alignItems: 'center', marginLeft: '38%' }}>
            <Comment style={{ marginRight: '5px', color: "#fa2c19" }} />
            共 {good.comment_count} 条评价
          </h6>
        </div>

        <div className="action-buttons">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: 400 }}>
            <Button type="primary" onClick={onBuyClick} style={{ flex: 1, marginRight: '8px', height: '40px' }}><Comment style={{ marginRight: '5px' }} />购买</Button>
            <Button type="default" onClick={onAddToCartClick} style={{ flex: 1, height: '40px' }}><Cart style={{ marginRight: '5px', size: '90' }} />添加到购物车</Button>
          </div>
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <Popup
          visible={showPopup}
          position="bottom"
          onClose={() => setShowPopup(false)}
          destroyOnClose
        >
          <div className="popup-content">
            <p>{good.name}</p>
            <Form
              onFinish={handleInitialConfirm}
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
                  <input type="text" value={priceInYuan} readOnly />
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

        <Popup
          visible={showConfirmPopup}
          position="bottom"
          onClose={() => setShowConfirmPopup(false)}
          destroyOnClose
        >
          <div className="popup-content">
            <p>确认购买以下商品:</p>
            <p>{good.name}</p>
            <p>价格: {priceInYuan}</p>
            <p>数量: {quantity}</p>
            <p>地址: {address ? `${address.province} ${address.city} ${address.town} ${address.street}` : '加载地址信息中...'}</p>
            <Button type="primary" block onClick={handleFinalConfirm}>
              确认购买
            </Button>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default DetailPage;
