import React, { useState } from 'react';
import { Tabbar } from '@nutui/nutui-react';
import { Cart, Category, Find, Home, User } from '@nutui/icons-react';
import { useNavigate } from 'react-router-dom';

const AppTabbar = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState('/');

  const handleTabChange = (value) => {
    setActiveIndex(value);
    switch (value) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/category');
        break;
      case 2:
        navigate('/find');
        break;
      case 3:
        navigate('/cart');
        break;
      case 4:
        navigate('/my');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <Tabbar
      value={activeIndex}
      onSwitch={handleTabChange}
      fixed
    >
      <Tabbar.Item title="首页" icon={<Home width={20} height={20} />} />
      <Tabbar.Item title="分类" icon={<Category width={20} height={20} />} />
      <Tabbar.Item title="发现" icon={<Find width={20} height={20} />} />
      <Tabbar.Item title="购物车" icon={<Cart width={20} height={20} />} />
      <Tabbar.Item title="我的" icon={<User width={20} height={20} />} />
    </Tabbar>
  );
};

export default AppTabbar;
