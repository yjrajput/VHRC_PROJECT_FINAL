import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('vhrc_admin_token');
  if (!token) return <Navigate to="/vhrc-admin" replace />;
  return children;
};

export default AdminProtectedRoute;
