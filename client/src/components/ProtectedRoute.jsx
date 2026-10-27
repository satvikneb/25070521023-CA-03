import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-indigo-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 shadow-glow-indigo"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}