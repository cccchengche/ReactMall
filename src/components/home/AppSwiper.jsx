import React, { useState } from 'react';
import { Swiper, SwiperItem } from '@nutui/nutui-react';

const list = [
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
];

const App = () => {
  return (
    <div className="demo-box" style={{ height: 200 }}>
      <Swiper
        autoPlay
        loop
        slideSize={350}
        indicator
        style={{
          '--nutui-indicator-color': '#426543',
          '--nutui-indicator-dot-color': '#426ddd',
        }}
        className='responsive-image-container'
      >
        {list.map((item, index) => {
          return (
            <SwiperItem key={item}>
              <img src={list[index]} alt={list[index]} draggable={false} className='responsive-image'/>
            </SwiperItem>
          )
        })}
      </Swiper>
    </div>
  )
}

export default App;
