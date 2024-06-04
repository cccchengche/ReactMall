import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from '@nutui/nutui-react';
import AppSearchBar from '../components/home/AppSearchBar.jsx';
import AppSwiper from '../components/home/AppSwiper.jsx';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <AppSearchBar />
      <Row className="home-content" type="flex" justify="center">
        <Col span={24}> 
          <AppSwiper />
          <Link to="/detail/1">商品1</Link>
          
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;

