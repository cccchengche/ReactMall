import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 使用 useNavigate
import { Row, Col, PullToRefresh, Toast, Price, Badge, Grid, Image  } from '@nutui/nutui-react'; // 导入相关组件
import AppSearchBar from '../components/home/AppSearchBar.jsx';
import AppSwiper from '../components/home/AppSwiper.jsx';
import AppHomeCard from '../components/home/AppHomeCard.jsx';
import baseUrl from '../config/config';
import '../css/HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // 使用 useNavigate

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
          setProducts(response.data.data);
          sessionStorage.setItem('products', JSON.stringify(response.data.data));
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

  // 处理数码按键点击事件，导航到数码类别页面
  const handleNumeralClick1 = () => {
    navigate('/categoryDetail/手机'); // 使用 navigate 导航
  };

  const handleNumeralClick2 = () => {
    navigate('/categoryDetail/曲面电视'); // 使用 navigate 导航
  };

  const handleNumeralClick3 = () => {
    navigate('/categoryDetail/牛仔裤'); // 使用 navigate 导航
  };

  const handleNumeralClick4 = () => {
    navigate('/categoryDetail/牛奶'); // 使用 navigate 导航
  };

  const handleNumeralClick5 = () => {
    navigate('/categoryDetail/老花镜'); // 使用 navigate 导航
  };

  return (
    <div className="home-container">
      <AppSearchBar style={{ width: '100%' }}/>
      <Row className="home-content" type='flex' justify="center">
        <Col span={24} className="grid-container">
          <PullToRefresh onRefresh={handleRefresh}>
            <AppSwiper />
            {/* 添加 Grid ,此处与商品分类链接！！！ comment by ZLT */}
            <Grid columns={5}>
              <Grid.Item text="数码" onClick={handleNumeralClick1}>
                <Image src={'src/assets/digit.jpg'} width="100%" height="100%" />
              </Grid.Item>
              <Grid.Item text="家电" onClick={handleNumeralClick2}>
                <Image src={'src/assets/household.jpg'} width="100%" height="100%" />
              </Grid.Item>
              <Grid.Item text="服装" onClick={handleNumeralClick3}>
                <Image src={'src/assets/clothing.jpg'} width="100%" height="100%" />
              </Grid.Item>
              <Grid.Item text="食品" onClick={handleNumeralClick4}>
                <Image src={'src/assets/delicacy.jpg'} width="100%" height="100%" />
              </Grid.Item>
              <Grid.Item text="百货" onClick={handleNumeralClick5}>
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
              <Row key={idx} gutter={[6, 6]} type='flex' justify="space-around" style={{ padding: '0 6px', marginLeft:'1.5px', marginTop:'8px' }}>
                {pair.map(product => (
                  <Col key={product.id} span={12}>
                    <AppHomeCard
                      title={product.name}
                      imageUrl={product.image}
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
