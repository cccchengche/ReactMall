import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Toast } from "@nutui/nutui-react";

const parseTokenString = (tokenString) => {
  const tokenArray = tokenString
    .slice(5, -1) // 去掉前面的 "User(" 和后面的 ")"
    .split(", ") // 按逗号和空格分割
    .map(pair => pair.split("=")); // 按等号分割每一对

  const tokenObject = {};
  tokenArray.forEach(([key, value]) => {
    tokenObject[key] = value;
  });

  return tokenObject;
};

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const tokenString = sessionStorage.getItem("token");

  let tokenObject = null;

  if (tokenString) {
    try {
      tokenObject = parseTokenString(tokenString);
      // 将 tokenObject 转换回字符串并存储在 sessionStorage
      sessionStorage.setItem("tokenObject", JSON.stringify(tokenObject));
    } catch (e) {
      console.error("Failed to parse token from sessionStorage", e);
    }
  }

  const hasValidToken = tokenObject && tokenObject.id; // 根据实际需求调整验证条件

  if (location.pathname === "/login" && hasValidToken) {
    console.log("Valid token found, redirecting to home...");
    Toast.show("您已经登录");
    return <Navigate to="/" replace />;
  }

  if (!hasValidToken && location.pathname !== "/login") {
    console.log("No valid token found, redirecting to login...");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
