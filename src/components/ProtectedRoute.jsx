import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';

const ProtectedRoute = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Page Layout with Background */}
      <main
        className={`transition-all duration-300 w-full ${
          isCollapsed ? 'ml-20' : 'ml-72'
        }`}
      >
        <div className="max-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 p-6 min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProtectedRoute;
