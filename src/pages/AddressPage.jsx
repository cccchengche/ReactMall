import React, { useState, useEffect } from 'react';
import { ArrowLeft } from '@nutui/icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AddressPage.css';

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
  const navigate = useNavigate();

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
      <div style={{ width: '24px' }}></div>
    </div>
  );
};

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/address/list', {
        params: {
          userId: 1 // 这里需要使用实际的userId
        }
      });
      if (response.data && response.data.code === 200 && Array.isArray(response.data.data)) {
        setAddresses(response.data.data);
      } else {
        console.error('Unexpected response data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching addresses', error);
    }
  };

  const deleteAddress = async (id, userId) => {
    try {
      await axios.delete('http://localhost:8081/api/address/delete', {
        params: { id, userId }
      });
      fetchAddresses(); // Refresh the address list
    } catch (error) {
      console.error('Error deleting address', error);
    }
  };

  const updateAddress = async (address) => {
    try {
      await axios.put('http://localhost:8081/api/address/update', address);
      fetchAddresses(); // Refresh the address list
    } catch (error) {
      console.error('Error updating address', error);
    }
  };

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
              {address.isDefault === "1" ? <span style={{ color: 'green', fontWeight: 'bold' }}>默认地址</span> : <span style={{ color: 'red' }}>设为默认</span>}
            </div>
            <div>
              <button className='btn' style={{ marginRight: '5px', }} onClick={() => updateAddress(address)}>编辑</button>
              <button className='btn' style={{ marginRight: '5px', }} onClick={() => deleteAddress(address.id, address.userId)}>删除</button>
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
