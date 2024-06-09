import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@nutui/icons-react';

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

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    navigate('/address-management'); // Assuming '/addresses' is your address list page
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
          <label style={{ marginRight: '10px', minWidth: '80px', textAlign: 'right' }}>地址：</label>
          <input style={{ padding: '10px 20px' }}
            type="text" name="address" placeholder="省/市/区/街道" value={`${formData.province} ${formData.city} ${formData.town} ${formData.street}`} onChange={handleInputChange} />
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
