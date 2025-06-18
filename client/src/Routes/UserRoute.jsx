import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Components/Loader/Loader";

const Login = React.lazy(() => import("../Auth/Login/LoginForm"));
const SignUp = React.lazy(() => import("../Auth/SignUp/SignUp"));

const UserRoute = () => {
  const routes = [
    { url: "/", element: <Loader /> },
    { url: "/login", element: <Login /> },
    { url: "/signup", element: <SignUp /> },
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.url} element={route.element} />
      ))}
    </Routes>
  );
};

export default UserRoute;
