import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, ArrowLeft } from '@nutui/icons-react';
import { Card } from '@nutui/nutui-react';
import baseUrl from '../config/config';
import '../css/CategoryPage.css';

const CategoryDetailPage = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const decodedName = decodeURIComponent(name);
    axios.post(`${baseUrl}/api/item`, { category: decodedName })
      .then(response => {
        if (response.data.code === 200 && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          throw new Error('Failed to fetch products');
        }
      })
      .catch(err => {
        setError(err.message || 'Error fetching products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="header">
        <ArrowLeft className='icon' width="20px" height="20px" onClick={() => navigate(-1)} />
        <span>{name}</span>
        <Search className='icon' width="20px" height="20px" onClick={() => console.log('搜索')} />
      </div>
      <div>
        {products.map((product) => {
          const stock = `库存：${product.stock}`;
          const brand = `品牌：${product.brand}`;
          const price = (product.price / 100);

          return (
            <Card
              key={product.id}
              src={product.image}
              style={{ marginTop: '20px' }}
              title={product.name}
              price={price}
              shopName={stock}
              tag={<div>{brand}</div>}
            >
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryDetailPage;
