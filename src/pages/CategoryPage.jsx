import React, { useState } from 'react';
import { Cell, CellGroup, Image as NutImage, Card as NutCard, } from '@nutui/nutui-react';
import { Search, ArrowLeft } from '@nutui/icons-react'
import '../css/CategoryPage.css';

const categories = [
  { id: 1, name: "零食" },
  { id: 2, name: "日用品" },
  { id: 3, name: "家电" }
];

const products = {
  1: [
    { id: 'a1', name: '瓜子', price: '100', brand: '交大精品', image: "" },
    { id: 'a2', name: '薯片', price: '100', brand: '交大精品', image: "" },
    { id: 'a3', name: '巧克力', price: '100', brand: '交大精品', image: "" },
  ],
  2: [
    { id: 'b1', name: '洗发水', price: '100', brand: '交大精品', image: "" },
    { id: 'b2', name: '牙膏', price: '100', brand: '交大精品', image: "" },
  ],
  3: [
    { id: 'c1', name: '电水壶', price: '100', brand: '交大精品', image: "" },
    { id: 'c2', name: '电饭煲', price: '100', brand: '交大精品', image: "" },
  ]
};

const CategoryPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].id);

  return (
    <div>
      <div className="header">
        <ArrowLeft className='icon' width="20px" height="20px" onClick={() => console.log('返回')} />
        <span>分类</span>
        <Search className='icon' width="20px" height="20px" onClick={() => console.log('搜索')} />
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '20%' }}>
          <CellGroup>
            {categories.map(category => (
              <Cell key={category.id} title={category.name}
                onClick={() => setSelectedCategoryId(category.id)}
                className={`categoryItem ${selectedCategoryId === category.id ? 'active' : ''}`}  // 使用模板字符串正确应用类名
                style={{ cursor: 'pointer' }} />
            ))}
          </CellGroup>
        </div>
        <div style={{ width: '80%', padding: '10px' }}>
          {products[selectedCategoryId].map(product => (
            <NutCard key={product.id} title={product.name}
              shopDescription={product.brand}
              price={product.price}>
              <NutImage src={product.image} width="100%" />
            </NutCard>
          ))}
        </div>
      </div>
    </div>

  );
}

export default CategoryPage;
