import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from '@nutui/nutui-react';
import AppSearchBar from '../components/home/AppSearchBar.jsx';
import AppSwiper from '../components/home/AppSwiper.jsx';
import AppHomeCard from '../components/home/AppHomeCard.jsx';
import '../css/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <AppSearchBar />
      <Row className="home-content" type='flex' justify="center">
        <Col span={24}>
          <AppSwiper />
          {/* 设置gutter为24px水平和垂直间距，调整justify属性来居中卡片 */}
          <Row gutter={[6, 6]} type='flex' justify="space-around" style={{ padding: '0 6px' }}>
            <Col span={12}>
              <AppHomeCard
                title="商品标题1"
                imageUrl="https://m.360buyimg.com/mobilecms/s720x720_jfs/t24781/87/2629118248/224593/d80976cc/5bea3864N9f957799.jpg!q70.jpg.webp"
                description="描述信息1"
                link="/detail/1"
              />
            </Col>
            <Col span={12}>
              <AppHomeCard
                title="商品标题2"
                imageUrl="https://m.360buyimg.com/mobilecms/s720x720_jfs/t1/9127/19/11092/257269/5c25b570E0506a53a/318404957ae1e636.jpg!q70.jpg.webp"
                description="描述信息2"
                link="/detail/2"
              />
            </Col>
          </Row>
          <Row gutter={[6, 6]} type='flex' justify="space-around" style={{ padding: '0 6px' }}>
            <Col span={12}>
              <AppHomeCard
                title="商品标题1"
                imageUrl="https://m.360buyimg.com/mobilecms/s720x720_jfs/t1/25076/32/2804/339477/5c20eff6E59cbabc2/f8dbaca519e3f3b1.jpg!q70.jpg.webp"
                description="描述信息1"
                link="/detail/1"
              />
            </Col>
            <Col span={12}>
              <AppHomeCard
                title="商品标题2"
                imageUrl="https://m.360buyimg.com/mobilecms/s720x720_jfs/t1/22734/21/2036/130399/5c18af2aEab296c01/7b148f18c6081654.jpg!q70.jpg.webp"
                description="描述信息2"
                link="/detail/2"
              />
            </Col>
          </Row>
          <Row gutter={[6, 6]} type='flex' justify="space-around" style={{ padding: '0 6px' }}>
            <Col span={12}>
              <AppHomeCard
                title="商品标题1"
                imageUrl="https://m.360buyimg.com/mobilecms/s720x720_jfs/t6934/364/1195375010/84676/e9f2c55f/597ece38N0ddcbc77.jpg!q70.jpg.webp"
                description="描述信息1"
                link="/detail/1"
              />
            </Col>
            <Col span={12}>
              <AppHomeCard
                title="商品标题2"
                imageUrl="https://m.360buyimg.com/mobilecms/s720x720_jfs/t1/5372/5/15919/391423/5bdfeff4Eb8f15189/d39cba927ffb0f69.jpg!q70.jpg.webp"
                description="描述信息2"
                link="/detail/2"
              />
            </Col>
          </Row>
          <Row gutter={[6, 6]} type='flex' justify="space-around" style={{ padding: '0 6px' }}>
            <Col span={12}>
              <AppHomeCard
                title="商品标题1"
                imageUrl="https://m.360buyimg.com/mobilecms/s720x720_jfs/t1/1156/8/14017/123589/5bd9a4e8E7dbd4a15/70fbbccdf8811111.jpg!q70.jpg.webp"
                description="描述信息1"
                link="/detail/1"
              />
            </Col>
            <Col span={12}>
              <AppHomeCard
                title="商品标题2"
                imageUrl="https://m.360buyimg.com/mobilecms/s720x720_jfs/t26632/42/1652775992/112721/6d069142/5be8122cN4fe1172e.jpg!q70.jpg.webp"
                description="描述信息2"
                link="/detail/2"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
