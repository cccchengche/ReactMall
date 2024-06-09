import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "./utils/auth/RequireAuth.jsx";

import App from './App.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import CartPage from "./pages/CartPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CategoryDetailPage from "./pages/CategoryDetailPage.jsx";
import FindPage from "./pages/FindPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import CreateOrderPage from "./pages/CreateOrderPage.jsx";
import PayPage from './pages/PayPage.jsx';
import OrderListPage from "./pages/OrderListPage.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
import SignUpPage from "./pages/SignupPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    // Component: LoginPage,
    Component: () => (
      <RequireAuth>
        <LoginPage />
      </RequireAuth>
      
    ),
  },
  {
    path: "/signup",
    Component: SignUpPage,
  },
  {
    path: "/detail/:goodId",
    Component: DetailPage,
  },
  {
    path: "/createOrder",
    Component: () => (
      <RequireAuth>
        <CreateOrderPage />
      </RequireAuth>
    ),
  },
  {
    path: "/pay/:orderId",
    Component: () => (
      <RequireAuth>
        <PayPage />
      </RequireAuth>
    ),
  },
  {
    path: "/orderList",
    Component: () => (
      <RequireAuth>
        <OrderListPage />
      </RequireAuth>
    ),
  },
  {
    path: "/orderDetail/:orderId",
    Component: () => (
      <RequireAuth>
        <OrderDetailPage />
      </RequireAuth>
    ),
  },
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/cart",
        Component: CartPage,
      },
      {
        path: "/category",
        Component: CategoryPage,
      },
      {
        path: "/categoryDetail/:name",
        Component: CategoryDetailPage,
      },
      {
        path: "/find",
        Component: FindPage,
      },
      {
        path: "/my",
        Component: MyPage,
      },
      {
        path: "/home",
        Component: HomePage,
      },
      {
        path: "/search",
        Component: SearchPage
      },
      ]
  }
]);

export default router;
