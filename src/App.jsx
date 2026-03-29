import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/fondoGlobal.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Recordbook from "./pages/recordbook";
import ProtectedRoute from "./components/protectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRol="cliente">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recordbook"
          element={
            <ProtectedRoute requiredRol="admin">
              <Recordbook />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}