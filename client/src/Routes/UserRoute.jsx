import React, { Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import ProtectedRoute from "./ProtectedRoutes/ProctedRoutes";
import NotFound from "../dashboard/Components/NotFound/NotFound";

// Lazy load public components
const Login = React.lazy(() => import("../Auth/Login/LoginForm"));
const SignUp = React.lazy(() => import("../Auth/SignUp/SignUp"));
const Layout = React.lazy(() => import("../dashboard/layout/layout"));
// const Profile = React.lazy(() => import("../dashboard/profile/Profile")); // ✅ Real component

// Public Routes
const publicRoutes = [
  { path: "/", element: <Loader /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
];

// Protected Routes
const protectedRoutes = [
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "profile",
        element: "hello",
      },
    ],
  },
];

const UserRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {/* Protected Routes (wrapped individually) */}
        {protectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          >
            {route.children?.map((child, childIndex) => (
              <Route
                key={childIndex}
                path={child.path}
                element={<ProtectedRoute>{child.element}</ProtectedRoute>}
              />
            ))}
          </Route>
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoute;
