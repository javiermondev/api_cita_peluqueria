import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/fondoGlobal.css";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("usuarios");
  const [usuarios, setUsuarios] = useState([]);
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Cargar usuarios registrados
  const cargarUsuarios = async () => {
    const { data, error } = await supabase
      .from("profiles") // o la tabla de usuarios
      .select("id, nombre, apellidos,email, telefono");
    if (error) {
      console.error(error);
    } else {
      setUsuarios(data);
    }
  };

  // Cargar citas
  const cargarCitas = async () => {
    const { data, error } = await supabase
      .from("citas")
      .select("id, fecha, hora, estado, cliente_id")
      .order("fecha", { ascending: true });
    if (error) {
      console.error(error);
    } else {
      // Podemos agregar info del usuario
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
    }
  };

  //  Marcar hora/día como ocupada o cancelar cita
  const modificarCita = async (citaId, motivo) => {
    const { error } = await supabase
      .from("citas")
      .update({ estado: "cancelada", motivo })
      .eq("id", citaId);
    if (error) {
      console.error(error);
      setMensaje("❌ Error al cancelar la cita");
    } else {
      setMensaje("✅ Cita cancelada correctamente");
      cargarCitas();
      // Aquí podrías llamar a una función para enviar email al usuario
      enviarEmailCancelacion(citaId, motivo);
    }
  };

  const enviarEmailCancelacion = (citaId, motivo) => {
    // Ejemplo de función, aquí se integraría un servicio de envío de emails
    console.log(`Enviar email: Cita ${citaId} cancelada. Motivo: ${motivo}`);
  };

  // Cargar datos al cambiar pestaña
  useEffect(() => {
    if (activeTab === "usuarios") {
      cargarUsuarios();
    } else if (activeTab === "verCitas" || activeTab === "modificarCitas") {
      cargarCitas();
    }
  }, [activeTab]);

  return (
    <div style={{ padding: "20px", }}>
      {/* Barra de pestañas / botones */}
      <div style={{ marginBottom: "20px", backgroundColor:"black", padding:10}}>
        <button onClick={() => setActiveTab("usuarios")} className="btn btn-success me-2" >Usuarios</button>
        <button onClick={() => setActiveTab("verCitas")} className="btn btn-success me-2">Ver Citas</button>
        <button onClick={() => setActiveTab("modificarCitas")} className="btn btn-success me-2">Modificar Citas</button>
      </div>

      {/* Div principal dinámico */}
      <div style={{ border: "1px solid #ccc", padding: "20px", minHeight: "300px", backgroundColor:"black" }}>
        {activeTab === "usuarios" && (
          <div>
            <h2 className="text-light ms-5">Usuarios Registrados</h2>
           <table className="table table-bordered table-striped border border-success rounded text-center">
              <thead>
                <tr className="bg-black text-light text-center">
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Email</th>
                   <th>Teléfono</th>
                </tr>
              </thead>
              <tbody >
                {usuarios.map((u, index) => (
                  <tr key={u.id}  className= {`border border-black ${index % 2 === 0 ? "fila-clara" : "fila-oscura"}`}>
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

        {activeTab === "verCitas" && (
          <div>
            {/* <h2>Citas</h2> */}
            <h2 className="text-light ms-5">Citas</h2>

<table className="table table-bordered table-striped border border-success rounded text-center">
  <thead>
    <tr className="bg-black text-light text-center">
      <th className="ms-3">Fecha</th>
      <th>Hora</th>
      <th>Usuario</th>
      <th>Email</th>
      <th>Estado</th>
    </tr>
  </thead>
  <tbody>
    {citas.map((cita, index) => (
      <tr
        key={cita.id}
        className={`border border-black ${index % 2 === 0 ? "fila-clara" : "fila-oscura"}`}
      >
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

        {activeTab === "modificarCitas" && (
          <div>
            {/* <h2>Modificar Citas</h2> */}
            <h2 className="text-light ms-5">Modificar Citas</h2>
            {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}


<table className="table table-bordered table-striped border border-success rounded text-center">
  <thead>
    <tr className="bg-black text-light text-center">
      <th>Fecha</th>
      <th>Hora</th>
      <th>Usuario</th>
      <th>Cancelar</th>
    </tr>
  </thead>
  <tbody>
    {citas.map((cita, index) => (
      <tr
        key={cita.id}
        className={`border border-black ${index % 2 === 0 ? "fila-clara" : "fila-oscura"}`}
      >
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


         
            {/* Aquí se podrían agregar controles para marcar horas/días ocupados */}
          </div>
        )}
      </div>
    </div>
  );
}
