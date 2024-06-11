import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Cell, CellGroup, Button, Toast, Skeleton, AnimatingNumbers, Popup, ConfigProvider } from '@nutui/nutui-react';
import { ArrowRight, Close } from '@nutui/icons-react';

const MyPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('未登录');
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBalancePopup, setShowBalancePopup] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // 用于重新渲染动画组件的键值
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRecharge = () => {
    Toast.show('充值功能暂未实现');
  };

  const handleWithdraw = () => {
    Toast.show('提现功能暂未实现');
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const matchUsername = token.match(/username=([^,]+)/);
        const matchBalance = token.match(/balance=([^,)]+)/);
        if (matchUsername) {
          setUsername(matchUsername[1]);
          setIsAuthenticated(true);
        } else {
          console.error('Username not found in token');
        }
        if (matchBalance) {
          // 将余额从分转换为元，并设置两位小数
          setBalance((Number(matchBalance[1]) / 100).toFixed(2));
        } else {
          console.error('Balance not found in token');
        }
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
    setLoading(false); // 假设获取数据后设置 loading 为 false
  }, []);

  const handleLogout = () => {
    Toast.show('已登出');
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    setUsername('未登录');
    navigate('/login'); // 登出后跳转到登录页面
  };

  const handleLogin = () => {
    navigate('/login'); // 跳转到登录页面
  };

  const handleCellClick = (path, isBalance) => {
    if (isAuthenticated) {
      if (isBalance) {
        setShowBalancePopup(true);
      } else {
        navigate(path);
      }
    } else {
      navigate('/login');
    }
  };

  // 当 showBalancePopup 变为 true 时，更新 animationKey 以重新渲染动画组件
  useEffect(() => {
    if (showBalancePopup) {
      setAnimationKey(prevKey => prevKey + 1);
    }
  }, [showBalancePopup]);

  return (
    <ConfigProvider>
      <div style={{ padding: '16px' }}>
        {loading ? (
          <Skeleton rows={3} title animated avatar avatarSize="100px" />
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <Avatar size="large" src="https://picsum.photos/200" />
              <span style={{ marginLeft: '16px', fontSize: '18px', fontWeight: 'bold' }}>{username}</span>
            </div>
            <CellGroup>
              <Cell
                title="全部订单"
                align="center"
                extra={<ArrowRight />}
                onClick={() => handleCellClick('/orders', false)}
              />
              <Cell
                title="地址管理"
                align="center"
                extra={<ArrowRight />}
                onClick={() => handleCellClick('/address-management', false)}
              />
              <Cell
                title="我的余额"
                align="center"
                extra={<ArrowRight />}
                onClick={() => handleCellClick(null, true)}
              />
            </CellGroup>
            {isAuthenticated ? (
              <Button type="danger" block onClick={handleLogout} style={{ marginTop: '16px' }}>
                退出登录
              </Button>
            ) : (
              <Button type="primary" block onClick={handleLogin} style={{ marginTop: '16px' }}>
                登录
              </Button>
            )}
            <Popup
              closeable
              visible={showBalancePopup}
              position="bottom"
              onClose={() => setShowBalancePopup(false)}
              closeIcon={<Close width="20px" height="20px" />}
            >
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <h2>我的余额</h2>
                <Cell
                  title={<AnimatingNumbers.CountUp key={animationKey} value={balance} />}
                  description="¥"
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                  <Button type="primary" style={{ width: "180px", marginRight: '20px' }} onClick={handleRecharge}>充值</Button>
                  <Button type="warning" style={{ width: "180px" }} onClick={handleWithdraw}>提现</Button>
                </div>
              </div>
            </Popup>
          </>
        )}
      </div>
    </ConfigProvider>
  );
};

export default MyPage;
