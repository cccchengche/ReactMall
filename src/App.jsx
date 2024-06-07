import React from 'react';
import { Outlet } from 'react-router';
import { Row, Col } from '@nutui/nutui-react';
import AppTabbar from './components/AppTabbar.jsx';
import './css/App.css';

function App() {
  return (
    <div className="app-container">
      <Row className="content" type="flex" justify="center">
        <Col span={24}>
          <Outlet />  {/* 子路由组件将在这里渲染 */}
        </Col>
      </Row>
      <AppTabbar className="bottom-tabbar"/>
    </div>
  );
}

export default App;