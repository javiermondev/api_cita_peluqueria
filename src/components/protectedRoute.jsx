import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRol }) {
  const { user, rol, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" replace />;

  // ❌ Si el usuario no tiene el rol requerido
  if (requiredRol && rol !== requiredRol) return <Navigate to="/" replace />;

  return children;
}