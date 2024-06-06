import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../css/signup.css";
import baseUrl from '../config/config';

function SignUpPage() {
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const hasNumber = /\d/;
        const hasLetter = /[a-zA-Z]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
        return password.length >= 8 && password.length <= 16 && 
            hasNumber.test(password) && hasLetter.test(password) && hasSpecialChar.test(password);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]{11}$/;
        return phoneRegex.test(phone);
    };

    const handleRegister = async () => {
        if (!nickname) {
            setErrorMessage('昵称不能为空。');
            return;
        }

        if (!validatePhone(phone)) {
            setErrorMessage('手机号必须是11位数字。');
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage('密码必须包含8-16位字符，包括数字，字母和特殊字符。');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('两次输入的密码不一致。');
            return;
        }

        try {
            const response = await axios.post(`${baseUrl}/api/user/register`, {
                username: nickname,
                password,
                phone
            });
            if(response.data.code == 200) {
                setSuccessMessage('注册成功！');
                setErrorMessage('');
                navigate('/login')
            } else {
                setSuccessMessage('');
                setErrorMessage(response.data.msg);
            }
        } catch (error) {
            setErrorMessage('注册失败，请重试。');
            setSuccessMessage('');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="box box-left"></div>
            <div className="box box-right">
                <div>
                    <p className="line1">Start here MALL! 🚀</p>
                    <p className="line2">请注册您的账户开始体验！</p>
                    <p className="in">昵称</p>
                    <input
                        type="text"
                        placeholder="请输入您的昵称"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
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
                    <p className="in">确认密码</p>
                    <input
                        type="password"
                        placeholder="请再次输入您的密码"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                    <button onClick={handleRegister}>注册</button>
                    <p className="signup">
                        已有账号？<Link to="/login">点击登录</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
