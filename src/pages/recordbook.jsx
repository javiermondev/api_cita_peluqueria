// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";
// import "../styles/fondoGlobal.css";
// import { useAuth } from "../context/AuthContext";


// export default function AdminPanel() {
//   const { user, loading } = useAuth(); // 🔹 AuthContext
//   const [activeTab, setActiveTab] = useState("usuarios");
//   const [usuarios, setUsuarios] = useState([]);
//   const [citas, setCitas] = useState([]);
//   const [mensaje, setMensaje] = useState("");

//   // 🔹 Cargar usuarios
//   const cargarUsuarios = async () => {
//     const { data, error } = await supabase
//       .from("profiles")
//       .select("id, nombre, apellidos, email, telefono");

//     if (!error) setUsuarios(data);
//     else console.error(error);
//   };

//   // 🔹 Cargar citas
//   const cargarCitas = async () => {
//     const { data, error } = await supabase
//       .from("citas")
//       .select("id, fecha, hora, estado, cliente_id")
//       .order("fecha", { ascending: true });

//     if (error) return console.error(error);

//     const citasConUsuario = await Promise.all(
//       data.map(async (cita) => {
//         const { data: user } = await supabase
//           .from("profiles")
//           .select("nombre, apellidos, email")
//           .eq("id", cita.cliente_id)
//           .single();

//         return { ...cita, usuario: user };
//       })
//     );

//     setCitas(citasConUsuario);
//   };

//   // 🔹 Cancelar cita
//   const modificarCita = async (citaId, motivo) => {
//     const { error } = await supabase
//       .from("citas")
//       .update({ estado: "cancelada", motivo })
//       .eq("id", citaId);

//     if (error) setMensaje("❌ Error al cancelar la cita");
//     else {
//       setMensaje("✅ Cita cancelada correctamente");
//       cargarCitas();
//       console.log(`Cita ${citaId} cancelada. Motivo: ${motivo}`);
//     }
//   };

//   // 🔹 useEffect para cargar datos según pestaña
//   useEffect(() => {
//     if (activeTab === "usuarios") cargarUsuarios();
//     else cargarCitas();
//   }, [activeTab]);

//   // 🔹 Mostrar loading o no autorizado
//   if (loading) return <p className="text-light">Cargando usuario...</p>;
//   if (!user) return <p className="text-light">No tienes permisos para acceder. Haz login.</p>;

//   return (
//     <div className="p-3">
//       {/* 🔹 BOTONES */}
//       <div className="mb-3 p-2 bg-dark">
//         <button onClick={() => setActiveTab("usuarios")} className="btn btn-success me-2">
//           Usuarios
//         </button>
//         <button onClick={() => setActiveTab("verCitas")} className="btn btn-success me-2">
//           Ver Citas
//         </button>
//         <button onClick={() => setActiveTab("modificarCitas")} className="btn btn-success">
//           Modificar Citas
//         </button>
//       </div>

//       {/* 🔹 CONTENIDO */}
//       <div className="p-4 bg-dark border border-secondary">
//         {/* USUARIOS */}
//         {activeTab === "usuarios" && (
//           <div>
//             <h2 className="text-light mb-4">Usuarios Registrados</h2>
//             <table className="table table-bordered table-striped border border-success text-center">
//               <thead>
//                 <tr className="bg-black text-light">
//                   <th>Nombre</th>
//                   <th>Apellidos</th>
//                   <th>Email</th>
//                   <th>Teléfono</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {usuarios.map((u, index) => (
//                   <tr key={u.id} className={index % 2 === 0 ? "fila-clara" : "fila-oscura"}>
//                     <td>{u.nombre}</td>
//                     <td>{u.apellidos}</td>
//                     <td>{u.email}</td>
//                     <td>{u.telefono}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* VER CITAS */}
//         {activeTab === "verCitas" && (
//           <div>
//             <h2 className="text-light mb-4">Citas</h2>
//             <table className="table table-bordered table-striped border border-success text-center">
//               <thead>
//                 <tr className="bg-black text-light">
//                   <th>Fecha</th>
//                   <th>Hora</th>
//                   <th>Usuario</th>
//                   <th>Email</th>
//                   <th>Estado</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {citas.map((cita, index) => (
//                   <tr key={cita.id} className={index % 2 === 0 ? "fila-clara" : "fila-oscura"}>
//                     <td>{cita.fecha}</td>
//                     <td>{cita.hora}</td>
//                     <td>{cita.usuario?.nombre}</td>
//                     <td>{cita.usuario?.email}</td>
//                     <td>{cita.estado}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* MODIFICAR CITAS */}
//         {activeTab === "modificarCitas" && (
//           <div>
//             <h2 className="text-light mb-4">Modificar Citas</h2>
//             {mensaje && <p className="text-danger">{mensaje}</p>}
//             <table className="table table-bordered table-striped border border-success text-center">
//               <thead>
//                 <tr className="bg-black text-light">
//                   <th>Fecha</th>
//                   <th>Hora</th>
//                   <th>Usuario</th>
//                   <th>Cancelar</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {citas.map((cita, index) => (
//                   <tr key={cita.id} className={index % 2 === 0 ? "fila-clara" : "fila-oscura"}>
//                     <td>{cita.fecha}</td>
//                     <td>{cita.hora}</td>
//                     <td>{cita.usuario?.nombre} {cita.usuario?.apellidos}</td>
//                     <td>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => {
//                           const motivo = prompt("Motivo de la cancelación:");
//                           if (motivo) modificarCita(cita.id, motivo);
//                         }}
//                       >
//                         Cancelar
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/fondoGlobal.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const { user, loading } = useAuth(); 
  const [activeTab, setActiveTab] = useState("usuarios");
  const [usuarios, setUsuarios] = useState([]);
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // 🔹 Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/dashboard"); // volver al dashboard inicial
    } catch (err) {
      console.error("Error cerrando sesión:", err.message);
    }
  };

  // 🔹 Cargar usuarios
  const cargarUsuarios = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, nombre, apellidos, email, telefono");

    if (!error) setUsuarios(data);
    else console.error(error);
  };

  // 🔹 Cargar citas
  const cargarCitas = async () => {
    const { data, error } = await supabase
      .from("citas")
      .select("id, fecha, hora, estado, cliente_id")
      .order("fecha", { ascending: true });

    if (error) return console.error(error);

    const citasConUsuario = await Promise.all(
      data.map(async (cita) => {
        const { data: user } = await supabase
          .from("profiles")
          .select("nombre, apellidos, email")
          .eq("id", cita.cliente_id)
          .single();

        return { ...cita, usuario: user };
      })
    );

    setCitas(citasConUsuario);
  };

  // 🔹 Cancelar cita
  const modificarCita = async (citaId, motivo) => {
    const { error } = await supabase
      .from("citas")
      .update({ estado: "cancelada", motivo })
      .eq("id", citaId);

    if (error) setMensaje("❌ Error al cancelar la cita");
    else {
      setMensaje("✅ Cita cancelada correctamente");
      cargarCitas();
      console.log(`Cita ${citaId} cancelada. Motivo: ${motivo}`);
    }
  };

  // 🔹 useEffect para cargar datos según pestaña
  useEffect(() => {
    if (activeTab === "usuarios") cargarUsuarios();
    else cargarCitas();
  }, [activeTab]);

  // 🔹 Mostrar loading o no autorizado
  if (loading) return <p className="text-light">Cargando usuario...</p>;
  if (!user) return <p className="text-light">No tienes permisos para acceder. Haz login.</p>;

  return (
    <div className="p-3">
      {/* 🔹 BOTONES */}
      <div className=" p-2 bg-dark d-flex align-items-center">
        <div>
          <button onClick={() => setActiveTab("usuarios")} className="btn btn-success me-2">
            Usuarios
          </button>
          <button onClick={() => setActiveTab("verCitas")} className="btn btn-success me-2">
            Ver Citas
          </button>
          <button onClick={() => setActiveTab("modificarCitas")} className="btn btn-success me-2">
            Modificar Citas
          </button>
        </div>
        {/* 🔹 Botón Cerrar Sesión a la derecha */}
        <button 
          onClick={handleLogout} 
          className="btn btn-success ms-auto"
        >
          Cerrar sesión
        </button>
      </div>

      {/* 🔹 CONTENIDO */}
      <div className="p-4 bg-dark border border-secondary">
        {/* USUARIOS */}
        {activeTab === "usuarios" && (
          <div>
            <h2 className="text-light mb-4">Usuarios Registrados</h2>
            <table className="table table-bordered table-striped border border-success text-center">
              <thead>
                <tr className="bg-black text-light">
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u, index) => (
                  <tr key={u.id} className={index % 2 === 0 ? "fila-clara" : "fila-oscura"}>
                    <td>{u.nombre}</td>
                    <td>{u.apellidos}</td>
                    <td>{u.email}</td>
                    <td>{u.telefono}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* VER CITAS */}
        {activeTab === "verCitas" && (
          <div>
            <h2 className="text-light mb-4">Citas</h2>
            <table className="table table-bordered table-striped border border-success text-center">
              <thead>
                <tr className="bg-black text-light">
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((cita, index) => (
                  <tr key={cita.id} className={index % 2 === 0 ? "fila-clara" : "fila-oscura"}>
                    <td>{cita.fecha}</td>
                    <td>{cita.hora}</td>
                    <td>{cita.usuario?.nombre}</td>
                    <td>{cita.usuario?.email}</td>
                    <td>{cita.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MODIFICAR CITAS */}
        {activeTab === "modificarCitas" && (
          <div>
            <h2 className="text-light mb-4">Modificar Citas</h2>
            {mensaje && <p className="text-danger">{mensaje}</p>}
            <table className="table table-bordered table-striped border border-success text-center">
              <thead>
                <tr className="bg-black text-light">
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Usuario</th>
                  <th>Cancelar</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((cita, index) => (
                  <tr key={cita.id} className={index % 2 === 0 ? "fila-clara" : "fila-oscura"}>
                    <td>{cita.fecha}</td>
                    <td>{cita.hora}</td>
                    <td>{cita.usuario?.nombre} {cita.usuario?.apellidos}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          const motivo = prompt("Motivo de la cancelación:");
                          if (motivo) modificarCita(cita.id, motivo);
                        }}
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}