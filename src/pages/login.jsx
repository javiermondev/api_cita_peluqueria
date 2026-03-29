// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { supabase } from "../lib/supabase";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "../styles/fondoGlobal.css";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);


// const { data, error } = await supabase.auth.signInWithPassword({
//   email,
//   password,
// });


//  if (error) {
//     console.error("Error iniciando sesión:", error.message);
//     setError("❌ Email o contraseña incorrectos2");
//     setLoading(false);
//     return; // detener ejecución aquí
//   }

//   // Login correcto
//   setLoading(false);

// // // ADMIN
// // if (email === "admin@gmail.com") {
// //   navigate("/recordbook");
// // } 
// // // USUARIO NORMAL
// // else {
// //   navigate("/dashboard");
// // }



//     if (error) {
//       setError("Email o contraseña incorrectos");
//       setLoading(false);
//       return;
//     }

//     setLoading(false);
//     navigate("/dashboard");
//   };

//   return (
//     <div className="bg-home min-vh-100">
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <div
//           className="container bg-light p-4 rounded"
//           style={{ maxWidth: "500px" }}
//         >
//           <h2 className="text-center mb-4">Iniciar sesión</h2>

//           {error && (
//             <div className="alert alert-danger text-center">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleLogin}>
//             <input
//               type="email"
//               className="form-control mb-3"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <input
//               type="password"
//               className="form-control mb-3"
//               placeholder="Contraseña"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//               {/* {error && <p className="mensaje-error">{error}</p>} */}

            

//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="btn btn-success"
//                 disabled={loading}
//               >
//                 {loading ? "Entrando..." : "Entrar"}
//               </button>

//               <button
//                 type="button"
//                 className="btn btn-outline-success ms-2"
//                 onClick={() => navigate("/")}
//               >
//                 Volver
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }





// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { supabase } from "../lib/supabase";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "../styles/fondoGlobal.css";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       // 1️⃣ Iniciar sesión con Supabase
//       const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (loginError) throw new Error(loginError.message);

//       if (!loginData.user) throw new Error("Usuario no encontrado");

//       // 2️⃣ Obtener rol desde tabla profiles
//       const { data: profileData, error: profileError } = await supabase
//         .from("profiles")
//         .select("rol")
//         .eq("id", loginData.user.id)
//         .single();

//       if (profileError) throw new Error(profileError.message);
//       if (!profileData || !profileData.rol) throw new Error("No se pudo obtener el rol");

//       // 3️⃣ Navegar según rol real
//       if (profileData.rol === "admin") {
//         navigate("/recordbook");
//       } else if (profileData.rol === "cliente") {
//         navigate("/dashboard");
//       } else {
//         navigate("/"); // rol desconocido
//       }

//     } catch (err) {
//       console.error("Error iniciando sesión:", err.message);
//       setError("❌ " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-home min-vh-100">
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <div className="container bg-light p-4 rounded" style={{ maxWidth: "500px" }}>
//           <h2 className="text-center mb-4">Iniciar sesión</h2>

//           {error && (
//             <div className="alert alert-danger text-center">{error}</div>
//           )}

//           <form onSubmit={handleLogin}>
//             <input
//               type="email"
//               className="form-control mb-3"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <input
//               type="password"
//               className="form-control mb-3"
//               placeholder="Contraseña"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <div className="text-center">
//               <button type="submit" className="btn btn-success" disabled={loading}>
//                 {loading ? "Entrando..." : "Entrar"}
//               </button>

//               <button
//                 type="button"
//                 className="btn btn-outline-success ms-2"
//                 onClick={() => navigate("/")}
//               >
//                 Volver
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/fondoGlobal.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔹 Cerrar sesión anterior
      await supabase.auth.signOut();

      // 🔹 Iniciar sesión con Supabase
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw new Error(loginError.message);
      if (!loginData.user) throw new Error("Usuario no encontrado");

      // 🔹 Obtener rol (campo "rol") desde tabla profiles
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("rol")
        .eq("id", loginData.user.id)
        .single();

      if (profileError) throw new Error(profileError.message);
      if (!profileData || !profileData.rol) throw new Error("No se pudo obtener el rol");

      console.log("Usuario:", loginData.user.email, "Rol:", profileData.rol); // 🔹 debug

      // 🔹 Navegar según rol real
      if (profileData.rol === "admin") {
        navigate("/recordbook");
      } else if (profileData.rol === "cliente") {
        navigate("/dashboard");
      } else {
        navigate("/"); // rol desconocido
      }

    } catch (err) {
      console.error("Error iniciando sesión:", err.message);
      setError("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-home min-vh-100">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container bg-light p-4 rounded" style={{ maxWidth: "500px" }}>
          <h2 className="text-center mb-4">Iniciar sesión</h2>

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="text-center">
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <button
                type="button"
                className="btn btn-outline-success ms-2"
                onClick={() => navigate("/")}
              >
                Volver
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}