import React, { useState, useEffect } from 'react';
import { ArrowLeft } from '@nutui/icons-react';
import { Card, Input, Button, Dialog, SearchBar, Toast } from '@nutui/nutui-react';
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
  const [currentAddress, setCurrentAddress] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    console.log(token);
    if (token) {
      const match = token.match(/id=(\d+)/);
      if (match) {
        const userId = match[1];
        fetchAddresses(userId);
        console.log("User ID:", userId);  // 打印用户ID
      } else {
        console.error("No ID found in the token string");
      }
    }
  }, []);

  const fetchAddresses = async (userId) => {
    try {
      const response = await axios.get('http://localhost:8081/api/address/list', {
        params: {
          userId: userId // 使用从token解码得到的userId
        }
      });
      if (response.data && response.data.code === 200 && Array.isArray(response.data.data)) {
        const sortedAddresses = response.data.data.sort((a, b) => b.isDefault - a.isDefault);
        setAddresses(sortedAddresses);
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
      fetchAddresses(userId); // Refresh the address list
    } catch (error) {
      console.error('Error deleting address', error);
    }
  };

  const updateAddress = async (address) => {
    try {
      await axios.put('http://localhost:8081/api/address/update', address);
      fetchAddresses(address.userId); // Refresh the address list
    } catch (error) {
      console.error('Error updating address', error);
    }
  };

  const setDefault = async (userId, addressId) => {
    try {
      await axios.put('http://localhost:8081/api/address/setDefault', null, {
        params: { userId, addressId }
      });
      fetchAddresses(userId); // Refresh the address list
    } catch (error) {
      console.error('Error setting default address', error);
    }
  };

  const handleEdit = (address) => {
    setCurrentAddress({ ...address });
    setIsDialogOpen(true);
  };

  const handleUpdate = async () => {
    updateAddress({ ...currentAddress });
    setIsDialogOpen(false);
  };

  return (
    <div className='addressPage' style={{ padding: '10px' }}>
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
              {address.isDefault === "1"
                ? <span style={{ color: 'green', fontWeight: 'bold' }}>默认地址</span>
                : <button className='btn' style={{ color: 'red' }} onClick={() => setDefault(address.userId, address.id)}>设为默认</button>
              }
            </div>
            <div>
              <button className='btn' style={{ marginRight: '10px', }} onClick={() => handleEdit(address)}>编辑</button>
              <button className='btn' style={{ marginRight: '5px', }} onClick={() => deleteAddress(address.id, address.userId)}>删除</button>
            </div>
          </div>
        </div>
      ))}
      <Dialog visible={isDialogOpen} title="编辑地址" onConfirm={handleUpdate} onClose={() => setIsDialogOpen(false)}>
        <input placeholder="联系人" value={currentAddress.contact || ''} onChange={(e) => setCurrentAddress({ ...currentAddress, contact: e.target.value })} />
        <input placeholder="手机号" value={currentAddress.mobile || ''} onChange={(e) => setCurrentAddress({ ...currentAddress, mobile: e.target.value })} />
        <input placeholder="省份" value={currentAddress.province || ''} onChange={(e) => setCurrentAddress({ ...currentAddress, province: e.target.value })} />
        <input placeholder="城市" value={currentAddress.city || ''} onChange={(e) => setCurrentAddress({ ...currentAddress, city: e.target.value })} />
        <input placeholder="区/县" value={currentAddress.town || ''} onChange={(e) => setCurrentAddress({ ...currentAddress, town: e.target.value })} />
        <input placeholder="街道" value={currentAddress.street || ''} onChange={(e) => setCurrentAddress({ ...currentAddress, street: e.target.value })} />
      </Dialog>
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
