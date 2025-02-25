import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import PageLayout from './component/layout';
import LoginPage from './component/login';
import { Navigate } from 'react-router-dom';
import { useAuth, } from './component/provider';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function App () {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <Spin tip="Loading" spinning={loading} indicator={<LoadingOutlined spin />}>
        <div className="App">
        </div>
      </Spin>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isLoggedIn ? <PageLayout /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage type={'register'} />} />
      </Routes>
    </div>
  );
}

export default App;
