import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell, CellGroup, Image as NutImage, Card as NutCard, } from '@nutui/nutui-react';
import { Search, ArrowLeft } from '@nutui/icons-react'
import '../css/CategoryPage.css';

const categories = [
  { id: 1, name: "电子产品" },
  { id: 2, name: "日用品" },
  { id: 3, name: "时尚与配饰" },
  { id: 4, name: "旅行用品" }
];

const products = {
  1: [
    { id: 'a1', name: '手机', image: "http://imgservice.suning.cn/uimg1/b2c/image/6mBbO8NKzEoMgcAzfTJsCg.jpg_800w_800h_4e" },
    { id: 'a2', name: '曲面电视', image: "https://images.samsung.com.cn/is/image/samsung/cn_UA88JS9900JXXZ_001_Silver_silver?$330_330_JPG$" },
    { id: 'a3', name: '硬盘', image: "https://img.pconline.com.cn/images/product/5997/599787/55dd09b7c9d827669.jpg_e600_m2.jpg" },
  ],
  2: [
    { id: 'b1', name: '拉拉裤', image: "https://tc1.yqbimg.net/cms_jfmall/goodsimg/cms/file/2018_4_24/APP15245592637257595.jpg" },
    { id: 'b2', name: '牛奶', image: "https://www.ourqm.com/upload/2021/02/05/20210205133255542.jpg" },
  ],
  3: [
    { id: 'c1', name: '休闲鞋', image: "http://t13.baidu.com/it/u=4120814506,2408535622&fm=224&app=112&f=JPEG?w=350&h=350" },
    { id: 'c2', name: '牛仔裤', image: "https://img2.baidu.com/it/u=1044916187,2010394981&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
    { id: 'c3', name: '真皮包', image: "https://img1.baidu.com/it/u=219803763,3597502159&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
    { id: 'c4', name: '老花镜', image: "http://cbu01.alicdn.com/img/ibank/2013/042/407/995704240_1090032426.jpg" },
  ],
  4: [
    { id: 'd1', name: '拉杆箱', image: "https://img.zcool.cn/community/01edd45a1269caa80121985cb2ade6.JPG@2o.jpg" },
  ]
};

const CategoryPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].id);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    setSelectedCategoryName(name);
    navigate(`/categoryDetail/${encodeURIComponent(name)}`);
  };

  return (
    <div>
      <div className="header">
        <ArrowLeft className='icon' width="20px" height="20px" onClick={() => navigate(-1)} />
        <span>分类</span>
        <Search className='icon' width="20px" height="20px" onClick={() => console.log('搜索')} />
      </div>
      <div style={{ display: 'flex',marginTop:'15%'  }}>
        <div style={{ width: '30%' }}>
          <CellGroup>
            {categories.map(category => (
              <Cell key={category.id} title={category.name}
                onClick={() => setSelectedCategoryId(category.id)}
                className={`categoryItem ${selectedCategoryId === category.id ? 'active' : ''}`}  // 使用模板字符串正确应用类名
                style={{ cursor: 'pointer' }} />
            ))}
          </CellGroup>
        </div>
        <div style={{ width: '70%', padding: '10px', display: 'flex', flexWrap: 'wrap', }}>
          {products[selectedCategoryId].map(product => (
            <div style={{ width: '50%', textAlign: 'center', marginBottom: '20px' }}>
              <img src={product.image} alt={product.name} style={{ cursor: 'pointer', width: '90%', }}
                onClick={() => handleCategoryClick(product.name)} />
              <p>{product.name}</p>
            </div>

          ))}
        </div>
      </div>
    </div>

  );
}

export default CategoryPage;
