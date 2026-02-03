import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) return <Navigate to="/" />; // Not logged in? Go to Login
  if (userRole !== allowedRole) return <Navigate to="/" />; // Wrong role? Go to Login
  
  return children;
};

export default ProtectedRoute;