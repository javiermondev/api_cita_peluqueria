import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
 import Register from "./pages/register";
 import Dashboard from "./pages/dashboard";
import Recordbook from "./pages/recordbook";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recordbook" element={<Recordbook />} /> 
      </Routes>
    </BrowserRouter>
  );
}

// import { useEffect, useState } from 'react'
// import { supabase } from './lib/supabase.js'

// console.log(">>> CARGANDO APP")


// function App() {
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     supabase.auth.getUser().then(({ data }) => {
//       setUser(data.user)
//     })
//   }, [])

//   return (
//     <div>
//       {user ? (
//         <p>Usuario logueado: {user.email}</p>
//       ) : (
//         <p>No hay usuario logueado</p>
//       )}
//     </div>
//   )
// }

// export default App

