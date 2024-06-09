import React, { useState } from 'react';
import axios from 'axios';
import { Card, Input, Button } from '@nutui/nutui-react';
import baseUrl from '../config/config';
import '../css/SearchPage.css';

const SearchPage = () => {
  const [name, setName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setLoading(true);
    setError(null);

    // 将价格从字符串转换为整数
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

  return (
    <div className="search-page">
      <div className="search-bar">
        <div className="input-group">
          <label>商品名称</label>
          <Input
            value={name}
            placeholder="请输入商品名称"
            onChange={(e) => setName(e)}
          />
        </div>
        <div className="input-group">
          <label>价格</label>
          <Input
            value={minPrice}
            placeholder="最低价格"
            type="number"
            onChange={(e) => setMinPrice(e)}
          />
          <span>-</span>
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
        <Button type="primary" onClick={handleSearch}>搜索</Button>
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
    </div>
  );
};

export default SearchPage;
