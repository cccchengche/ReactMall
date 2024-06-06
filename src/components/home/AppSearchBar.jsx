import React from 'react';
import { Photograph } from '@nutui/icons-react';
import { SearchBar, ConfigProvider, Toast, Button } from '@nutui/nutui-react';
import '../../css/AppSearchBar.css';

const AppSearchBar = () => {
  const marginStyle = { marginLeft: 8 };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, backgroundColor: '#fff', padding: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <ConfigProvider
        theme={{
          nutuiSearchbarBackground: 'var(--nutui-color-primary)',
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
            <Button type="primary" style={marginStyle} className="responsive-button">搜索</Button>
            }
          onSearch={(value) => Toast.show(value)}
        />
      </ConfigProvider>
    </div>
  );
}

export default AppSearchBar;
