import React from 'react';
import { SearchBar, ConfigProvider, Toast, Button } from '@nutui/nutui-react';
import { Photograph } from '@nutui/icons-react';
import { useNavigate } from 'react-router-dom';
//import 'nutui/dist/styles/index.scss'; // 导入 NutUI 样式
import '../../css/AppSearchBar.css';

const AppSearchBar = () => {
  const navigate = useNavigate();
  return (
    <div className="search-bar-container" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '10px' }} onClick={() => navigate('/search')}>
      <ConfigProvider
        theme={{
          nutuiSearchbarBackground: 'rgba(247, 247, 247, 1)',
          nutuiSearchbarInputBackground: '#eee',
          nutuiSearchbarInputTextAlign: 'left',
        }}
      >
        <SearchBar
          rightIn={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Photograph
                width={16}
                height={16}
                onClick={() => {
                  console.log('Photograph right in');
                }}
              />
            </div>
          }
          right={
            <Button type="primary" className="responsive-button">搜索</Button>
          }
          onSearch={(value) => Toast.show(value)}
        />
      </ConfigProvider>
    </div>
  );
}

export default AppSearchBar;
