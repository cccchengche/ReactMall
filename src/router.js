import { createBrowserRouter } from "react-router-dom";

import App from './App';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import FindPage from "./pages/FindPage";
import MyPage from "./pages/MyPage";
import DetailPage from "./pages/DetailPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import PayPage from './pages/PayPage';
import OrderListPage from "./pages/OrderListPage";
import OrderDetailPage from "./pages/OrderDetailPage";

const router = createBrowserRouter([
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
        path: "/find",
        Component: FindPage,
      },
      {
        path: "/my",
        Component: MyPage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/home",
        Component: HomePage,
      },
      {
        path: "/detail/:goodId",
        Component: DetailPage,
      },
      {
        path: "/createOrder/:goodId",
        Component: CreateOrderPage,
      },
      {
        path: "/pay/:orderId",
        Component: PayPage,
      },
      {
        path: "/orderList",
        Component: OrderListPage,
      },
      {
        path: "/orderDetail/:orderId",
        Component: OrderDetailPage,
      },
    ]
  }
]);

export default router;