import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { App } from "../App";
import { Layout } from "../layout/Layout";

import { Dashboard, Login, Product } from "../pages";
import { useAuth } from "../shared/hooks";
import { Category } from "../pages/category/Category";
import {
  AuthProvider,
  CategoryProvider,
  ProductProvider,
} from "../shared/contexts";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/product"
                    element={
                      <PrivateRoute>
                        <Product />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/category"
                    element={
                      <PrivateRoute>
                        <Category />
                      </PrivateRoute>
                    }
                  />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Route>
            </Routes>
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
