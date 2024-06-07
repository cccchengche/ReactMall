## 运行命令
npm i
npm run dev

## 路由守卫

实现了对以下页面的守卫：

创建订单

支付页面

订单列表

订单详情

在未登录状态下进入上述页面会跳转回登录页面，登录后会回到要跳转的页面

## 我的页面

在未登录状态下：

- 用户名会显示为未登录
- 退出登录按钮会显示为登录按钮
- 点击地址管理、全部账单、我的余额都会跳转到登录按钮

## 首页

- 增加了商品卡片显示，点击卡片会跳转到商品详情页

- 商品卡片与后端连接，从后端数据库中随机返回50条商品信息

- 增加了下拉刷新功能

## 商品详情

- 显示所有从后端返回的关于商品的数据
- 购买按钮（简单逻辑 老师实现的）
- 添加到购物车 尚未实现提交表单 发请求到后端存储
