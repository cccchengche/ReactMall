import React from 'react';
import { Swiper, SwiperItem } from '@nutui/nutui-react';

const list = [
  'https://59.110.42.1:8888/down/4IbSeQq3NTHq.jpg',
  'https://59.110.42.1:8888/down/fJ34qZGUujSn.jpg',
  'https://59.110.42.1:8888/down/ShtBrtH2WJDz.png',
  'https://59.110.42.1:8888/down/4IbSeQq3NTHq.jpg'
];

const App = () => {
  return (
    <div className="demo-box" style={{ height: 200 }}>
      <Swiper
        autoPlay
        loop
        slideSize={450}
        indicator
        style={{
          '--nutui-indicator-color': '#426543',
          '--nutui-indicator-dot-color': '#426ddd',
          width: '100%', // 设置轮播容器的宽度为100%，使其与父容器等宽
          height: '100%' // 设置轮播容器的高度为100%，使其与父容器等高
        }}
      >
        {list.map((item, index) => {
          return (
            <SwiperItem key={item}>
              <img
                src={list[index]}
                alt={list[index]}
                draggable={false}
                style={{
                  width: '100%', // 设置图片宽度为100%，使其填充轮播容器
                  height: '100%', // 设置图片高度为100%，使其填充轮播容器
                  objectFit: 'cover' // 使用 cover 值，保持图片比例不变且填充整个容器
                }}
              />
            </SwiperItem>
          )
        })}
      </Swiper>
    </div>
  )
}

export default App;
