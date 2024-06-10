import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row, Col, List, Badge, Spin, Avatar, Card, Rate } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {Jimi} from '@nutui/icons-react'
import baseUrl from '../config/config';


const FindPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get(`${baseUrl}/api/item/get50`)
      .then(response => {
        if (response.data.code === 200 && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error('Failed to fetch products:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleProductClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  const generateRandomRating = () => {
    const ratings = [3, 4, 4, 5, 5]; //打星的概率
    return ratings[Math.floor(Math.random() * ratings.length)];
  };

  const generateRandomReview = () => {
    const reviews = [
      '很不错的商品，性价比很高，值得购买！',
      '一直想买这款商品，终于下手了，希望不会让我失望！',
      '产品质量很好，快递也很给力，下次还会再来购买！',
      '给老婆买的，她很喜欢，很满意！',
      '这是我第二次购买了，一如既往的好！',
      '颜色很正，质量不错，还会再来购买的！'
    ];
    return reviews[Math.floor(Math.random() * reviews.length)];
  };

  const renderProductActions = () => (
    <div className="product-actions">
      <HeartOutlined className="action-icon" />
      <ShoppingCartOutlined className="action-icon" />
    </div>
  );

  return (
    <>
      <div className="top-bar" style={{ backgroundColor: 'white', borderBottom: '1px solid #d9d9d9', padding: '8px 0', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1 }}>
        <Row justify="center">
          <Col span={20}>
            <span style={{ fontSize: '20px', color: 'black',marginLeft:'33vw' }}>
              <Jimi style={{ marginRight: '8px', color:'red' }} />
              发现
            </span>
          </Col>
        </Row>
      </div>
      <div style={{ paddingTop: '56px' }}> 
        <Row gutter={[16, 16]} justify="center">
          <Col span={20}>
            <Spin spinning={loading}>
              <List
                dataSource={products}
                renderItem={product => (
                  <List.Item onClick={() => handleProductClick(product.id)}>
                    <Card
                      hoverable
                      style={{ width: '100%' }}
                      cover={<img alt="Product Image" src={product.image} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />}
                    >
                      <Card.Meta
                        avatar={<Avatar src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 100)}`} />} //随机头像
                        title={product.name}
                        description={
                          <>
                            <div>
                              <Rate disabled defaultValue={generateRandomRating()} />
                            </div>
                            <div>价格: {product.price}</div>
                            <div>感受评价: {generateRandomReview()}</div>
                          </>
                        }
                      />
                      <div className="product-actions">
                        {renderProductActions()}
                      </div>
                      <div className="product-tags">
                        {product.tags && product.tags.map((tag, index) => (
                          <Badge key={index} text={tag} />
                        ))}
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            </Spin>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default FindPage;
