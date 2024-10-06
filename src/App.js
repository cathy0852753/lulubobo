import './App.css';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './component/layout';
import LoginPage from './component/login';
import { Navigate } from 'react-router-dom';
import { useAuth } from './component/provider';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};


function App () {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProtectedRoute><PageLayout /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage type={'register'} />} />
      </Routes>
    </div>
  );
}

export default App;
