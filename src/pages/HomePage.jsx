import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, PullToRefresh, Toast } from '@nutui/nutui-react';
import AppSearchBar from '../components/home/AppSearchBar.jsx';
import AppSwiper from '../components/home/AppSwiper.jsx';
import AppHomeCard from '../components/home/AppHomeCard.jsx';
import baseUrl from '../config/config';
import '../css/HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedProducts = sessionStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = () => {
    axios.get(`${baseUrl}/api/item/get50`)
      .then(response => {
        if (response.data.code === 200 && Array.isArray(response.data.data)) {
          setProducts(response.data.data);  // 使用响应中的数据更新状态
          sessionStorage.setItem('products', JSON.stringify(response.data.data));  // 将数据存储到sessionStorage
        } else {
          setErrorMessage('获取商品信息失败');
        }
      })
      .catch(error => {
        setErrorMessage('无法获取商品信息，请稍后再试');
        console.error('Error fetching products:', error);
      });
  };

  const handleRefresh = () => {
    return new Promise((resolve) => {
      fetchProducts();
      resolve('done');
    });
  };

  return (
    <div className="home-container">
      <AppSearchBar />
      <Row className="home-content" type='flex' justify="center">
        <Col span={24}>
          <PullToRefresh onRefresh={handleRefresh}>
            <AppSwiper />
            {/* 动态加载的商品卡片 */}
            {products.reduce((rows, product, index) => {
              if (index % 2 === 0) {
                rows.push([product]);
              } else {
                rows[rows.length - 1].push(product);
              }
              return rows;
            }, []).map((pair, idx) => (
              <Row key={idx} gutter={[6, 6]} type='flex' justify="space-around" style={{ padding: '0 6px' }}>
                {pair.map(product => (
                  <Col key={product.id} span={12}>
                    <AppHomeCard
                      title={product.name}
                      imageUrl={product.image}
                      description={`价格: ${product.price / 100}元`}
                      link={`/detail/${product.id}`}
                    />
                  </Col>
                ))}
              </Row>
            ))}
            {errorMessage && <p className="error">{errorMessage}</p>}
          </PullToRefresh>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;