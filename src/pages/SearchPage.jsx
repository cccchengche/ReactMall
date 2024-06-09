import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate
import axios from 'axios';
import { Card, Input, Button, Dialog, SearchBar, Toast } from '@nutui/nutui-react';
import { Photograph, ArrowLeft } from '@nutui/icons-react'; // 导入 ArrowLeft 图标
import baseUrl from '../config/config';
import '../css/SearchPage.css';

const SearchPage = () => {
  const navigate = useNavigate(); // 使用 useNavigate 钩子
  const [name, setName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setError(null);

    const filters = {
      name,
      minPrice: minPrice ? parseInt(minPrice) : null,
      maxPrice: maxPrice ? parseInt(maxPrice) : null,
      brand,
    };

    axios.post(`${baseUrl}/api/item/filter`, filters)
      .then(response => {
        if (response.data.code === 200 && Array.isArray(response.data.data)) {
          setResults(response.data.data);
        } else {
          throw new Error('Failed to fetch search results');
        }
      })
      .catch(err => {
        setError(err.message || 'Error fetching search results');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  return (
    <div className="search-page">
      <div className="search-bar-container">
        <ArrowLeft className="back-icon" onClick={() => navigate(-1)} />
        <SearchBar
          value={name}
          placeholder="请输入商品名称"
          onChange={(value) => setName(value)}
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
            <>
              <Button type="primary" className="responsive-button" onClick={handleSearch}>搜索</Button>
              <Button type="default" className="responsive-button" onClick={openDialog}>更多</Button>
            </>
          }
          onSearch={() => Toast.show(name)}
        />
      </div>
      {loading && <p>加载中...</p>}
      {error && <p className="error">{error}</p>}
      <div className="search-results">
        {results.map((product) => (
          <Card
            key={product.id}
            src={product.image}
            style={{ marginTop: '20px' }}
            title={product.name}
            price={product.price}
            shopName={`库存：${product.stock}`}
            tag={<div>{`品牌：${product.brand}`}</div>}
          >
          </Card>
        ))}
      </div>
      <Dialog
        visible={dialogVisible}
        title="更多选项"
        onClose={closeDialog}
      >
        <div className="input-group">
          <label>最低价格</label>
          <Input
            value={minPrice}
            placeholder="最低价格"
            type="number"
            onChange={(e) => setMinPrice(e)}
          />
        </div>
        <div className="input-group">
          <label>最高价格</label>
          <Input
            value={maxPrice}
            placeholder="最高价格"
            type="number"
            onChange={(e) => setMaxPrice(e)}
          />
        </div>
        <div className="input-group">
          <label>品牌</label>
          <Input
            value={brand}
            placeholder="请输入品牌"
            onChange={(e) => setBrand(e)}
          />
        </div>
        <Button type="primary" onClick={closeDialog}>确定</Button>
      </Dialog>
    </div>
  );
};

export default SearchPage;
