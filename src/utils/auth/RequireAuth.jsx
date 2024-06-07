import React from "react";
import { Navigate, useLocation } from "react-router-dom";

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

  console.log("tokenString:", tokenString);

  let tokenObject = null;

  if (tokenString) {
    try {
      tokenObject = parseTokenString(tokenString);
      console.log("Parsed tokenObject:", tokenObject);
    } catch (e) {
      console.error("Failed to parse token from sessionStorage", e);
    }
  }

  const hasValidToken = tokenObject && tokenObject.id; // 根据实际需求调整验证条件

  if (!hasValidToken) {
    console.log("No valid token found, redirecting to login...");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
