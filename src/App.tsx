import React from 'react';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "primeflex/primeflex.css";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { isUserLoggedin } from './features/auth/authSlice';
import Login from './pages/login';
import Layout from './shares/Layout';
function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route element={  <Layout />}>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <ProtectedPage></ProtectedPage>
                  </RequireAuth>
                }
                />
            </Route>
            
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}
function RequireAuth({ children }: { children: JSX.Element }) {

  const isLoggedIn = useAppSelector(isUserLoggedin);
  let location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
function ProtectedPage() {
  return <h3>Protected</h3>;
}
export default App;
