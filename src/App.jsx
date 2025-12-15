import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
 import Register from "./pages/register/register";
// import Dashboard from "./pages/dashboard";
// import BookAppointment from "./pages/bookAppointment";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<BookAppointment />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

