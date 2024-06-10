import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@nutui/icons-react';
import axios from 'axios';

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
      <span>新增收货地址</span>
      <div style={{ width: '24px' }}></div> {/* 占位元素保持对称性 */}
    </div>
  );
};

const AddAddressPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contact: '',
    mobile: '',
    province: '',
    city: '',
    town: '',
    street: '',
    isDefault: false,
    note: '',
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const match = token.match(/id=(\d+)/);
      if (match) {
        const userId = match[1];
        setUserId(userId);
        console.log("User ID:", userId);  // 打印用户ID
      } else {
        console.error("No ID found in the token string");
      }
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      isDefault: formData.isDefault ? 1 : 0, // 将 isDefault 转换为 0 或 1
      userId // 添加 userId
    };
    try {
      const response = await axios.post('http://localhost:8081/api/address/add', dataToSubmit);
      if (response.data && response.data.code === 200) {
        navigate('/address-management'); // Assuming '/address-management' is your address list page
      } else {
        console.error('Unexpected response data:', response.data);
      }
    } catch (error) {
      console.error('Error adding address', error);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '80px', textAlign: 'right' }}>联系人：</label>
          <input style={{ padding: '10px 20px' }}
            type="text" name="contact" placeholder="请输入联系人姓名" value={formData.contact} onChange={handleInputChange} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '80px', textAlign: 'right' }}>手机号：</label>
          <input style={{ padding: '10px 20px' }}
            type="text" name="mobile" placeholder="请输入手机号" value={formData.mobile} onChange={handleInputChange} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '80px', textAlign: 'right' }}>省份：</label>
          <input style={{ padding: '10px 20px' }}
            type="text" name="province" placeholder="请输入省份" value={formData.province} onChange={handleInputChange} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '80px', textAlign: 'right' }}>城市：</label>
          <input style={{ padding: '10px 20px' }}
            type="text" name="city" placeholder="请输入城市" value={formData.city} onChange={handleInputChange} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '80px', textAlign: 'right' }}>区/县：</label>
          <input style={{ padding: '10px 20px' }}
            type="text" name="town" placeholder="请输入区/县" value={formData.town} onChange={handleInputChange} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '80px', textAlign: 'right' }}>街道：</label>
          <input style={{ padding: '10px 20px' }}
            type="text" name="street" placeholder="请输入街道" value={formData.street} onChange={handleInputChange} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '80px', textAlign: 'right' }}>备注：</label>
          <input style={{ padding: '10px 20px' }}
            type="text" name="note" placeholder="请输入备注" value={formData.note} onChange={handleInputChange} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <label style={{ marginRight: '10px', minWidth: '80px', textAlign: 'right' }}>默认地址：</label>
          <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleInputChange} />
        </div>
        <button type="submit" style={{ display: 'block', width: '100%', padding: '10px 0', backgroundColor: '#ff3940', borderColor: '#ff3940', color: '#fff', borderRadius: '5px', marginTop: '20px' }}>确认</button>
      </form>
    </div>
  );
};

export default AddAddressPage;
