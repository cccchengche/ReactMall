import React from 'react';
import { ArrowLeft } from '@nutui/icons-react';
import { useNavigate } from 'react-router-dom';
import '../css/AddressPage.css'

const AddressPage = () => {
  return (
    <div>
      <Header />
      <AddressList />
      <AddAddressButton />
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();  // 初始化 navigate 函数

  return (
    <div style={{
      padding: '10px',
      backgroundColor: '#ff3940',
      color: '#fff',
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    }}>
      <ArrowLeft
        className='icon'
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          left: '10px',
          cursor: 'pointer',
          width: '20px',
          height: '20px'
        }}
      />
      <span>收货地址</span>
      <div style={{ width: '24px' }}> {/* 占位元素保持对称性 */}</div>
    </div>
  );
};


const AddressList = () => {
  const addresses = [
    {
      id: 1,
      userId: 'user001',
      mobile: '12345678901',
      province: '浙江省',
      city: '杭州市',
      town: '西湖区',
      street: '文三路123号',
      contact: '小明',
      isDefault: true,
      note: "家庭住址"
    },
    {
      id: 2,
      userId: 'user002',
      mobile: '23456789012',
      province: '广东省',
      city: '广州市',
      town: '天河区',
      street: '体育西路456号',
      contact: '小红',
      isDefault: false,
      note: "办公地址"
    },
    {
      id: 3,
      userId: 'user003',
      mobile: '34567890123',
      province: '北京市',
      city: '北京市',
      town: '朝阳区',
      street: '朝阳门外大街789号',
      contact: '小李',
      isDefault: false,
      note: "朋友家"
    }
  ];


  return (
    <div style={{ padding: '10px' }}>
      {addresses.map((address) => (
        <div key={address.id} style={{ marginBottom: '20px', padding: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>
            {address.contact} - {address.mobile}
          </div>
          <div style={{ marginBottom: '10px' }}>
            {address.province} {address.city} {address.town} {address.street}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              {address.isDefault ? <span style={{ color: 'green', fontWeight: 'bold' }}>默认地址</span> : <span style={{ color: 'red' }}>设为默认</span>}
            </div>
            <div>
              <button className='btn' style={{ marginRight: '5px', }} onClick={() => console.log('修改', address.id)}>编辑</button>
              <button className='btn' style={{ marginRight: '5px', }} onClick={() => console.log('删除', address.id)}>删除</button>
              <button className='btn' onClick={() => console.log('复制', address.id)}>复制</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AddAddressButton = () => {
  const navigate = useNavigate();
  return (
    <button style={{ position: 'fixed', bottom: '10px', left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', backgroundColor: '#ff3940', color: 'white', borderRadius: '10px', border: "none" }}
      onClick={() => navigate('/add-address')}>
      新增收货地址
    </button>
  );
};

export default AddressPage;
