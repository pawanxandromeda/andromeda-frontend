import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Settings from './pages/Settings';
import TrainAI from './pages/TrainAI';
import BusinessSetup from './pages/BusinessSetup';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import Feedback from './pages/Feedback';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/train-ai" element={<TrainAI />} />
          <Route path="/feedback" element={<Feedback />} />  
          <Route path="/business-setup" element={<BusinessSetup />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;