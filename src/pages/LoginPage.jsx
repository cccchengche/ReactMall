import React, { useState } from 'react';
import axios from 'axios';
import "../css/login.css";
import baseUrl from "../config/config"
import { Link, useNavigate, useLocation } from 'react-router-dom';
import background from '../assets/OIP-C.jpg';

function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/user/login`, { phone, password });
      // 处理成功响应，例如跳转到首页或显示成功消息
      console.log(response.data);
      // 如果有token之类的，可以存储到localStorage或cookie中
      if(response.data.code === 200) {
        sessionStorage.setItem('token', response.data.data.token);
        // navigate('/'); // 跳转到首页
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true }); // 跳转到登录前的页面或首页
      } else {
        setErrorMessage('登录失败，请检查您的手机号和密码');
      }
    } catch (error) {
      // 处理错误响应
      setErrorMessage('登录失败，请检查您的手机号和密码');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="box-left"></div>
      <div className="box box-right">
        <div className='right-header'>
          <img src={background} alt='logo' />
        </div>
        <div className='right-main'>
          <p className="line1">Welcome to MALL! 👋</p>
          <p className="line2">请登录您的账户开始体验！</p>
          <form onSubmit={handleSubmit}>
            <p className="in">手机号</p>
            <input
              type="text"
              placeholder="请输入您的手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p className="in">密码</p>
            <input
              type="password"
              placeholder="请输入您的密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <p className="error">{errorMessage}</p>}
            <button type="submit">登录</button>
          </form>
          <p className="signup">还没有账号？<Link to="/signup">点击注册</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
