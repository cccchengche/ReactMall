import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, PullToRefresh, Toast, Price, Badge, Grid,Image  } from '@nutui/nutui-react'; // 导入相关组件
import { IconFont,Home } from '@nutui/icons-react'; // 导入图标
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
        <Col span={24} className="grid-container">
          <PullToRefresh onRefresh={handleRefresh}>
            <AppSwiper />
            {/* 添加 Grid ,此处与商品分类链接！！！ comment by ZLT */}
            <Grid columns={5}>
              <Grid.Item text="数码">
              <Image src={'src/assets/delicacy.jpg'} width="100%" height="100%" />
              </Grid.Item>
              <Grid.Item text="家电">
              <Image src={'src/assets/household.jpg'} width="100%" height="100%" />
              </Grid.Item>
              <Grid.Item text="服装">
              <Image src={'src/assets/clothing.jpg'} width="100%" height="100%" />
              </Grid.Item>
              <Grid.Item text="食品">
              <Image src={'src/assets/delicacy.jpg'} width="100%" height="100%" />
              </Grid.Item>
              <Grid.Item text="百货">
              <Image src={'src/assets/department.jpg'} width="100%" height="100%" />
              </Grid.Item>
            </Grid>
            {/* 加载商品卡片 */}
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
                      // 使用 Price
                      description={
                        <>
                          <Price price={product.price / 100} size="large" />
                          <span style={{ marginLeft: '8px' }}>销量: {product.sold}+</span>
                          <div style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}>
                            <Badge color="red" value="包邮" style={{ marginRight: '2px', marginBottom:'12px' }} />
                            <Badge color="orange" value="7天价保" style={{ marginLeft: '30px', marginBottom:'12px' }} />
                            <Badge color="gold" value="先享后付" style={{ marginLeft: '48px', marginBottom:'12px' }} />
                          </div>
                        </>
                      }
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
