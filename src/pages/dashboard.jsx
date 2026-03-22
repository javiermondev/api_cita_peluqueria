
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabase";
import "../styles/fondoGlobal.css";

const HORAS = ["09:00", "10:00", "11:00", "12:00", "16:00", "17:00", "18:00"];

export default function Dashboard() {
  const navigate = useNavigate();

  // Estados
  const [user, setUser] = useState(undefined);
  const [profile, setProfile] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [citaUsuario, setCitaUsuario] = useState(null);

  // Obtener usuario
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        setUser(null);
        navigate("/");
        return;
      }

      if (user.email === "admin@gmail.com") {
        navigate("/recordbook");
        return;
      }

      setUser(user);
    };

    fetchUser();
  }, [navigate]);

  // Cargar perfil
  useEffect(() => {
    if (!user) return;

    const cargarPerfil = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("nombre")
        .eq("id", user.id)
        .single();

      setProfile(data || { nombre: "Usuario" });
    };

    cargarPerfil();
  }, [user]);

  //  Cargar cita del usuario
  const cargarCitaUsuario = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("citas")
      .select("fecha, hora")
      .eq("cliente_id", user.id)
      .eq("estado", "pendiente")
      .limit(1);

    if (error) {
      console.error(error);
      setCitaUsuario(null);
    } else {
      console.log("CITA:", data);
      setCitaUsuario(data.length > 0 ? data[0] : null);
    }
  };

  useEffect(() => {
    if (user) {
      cargarCitaUsuario();
    }
  }, [user]);

  // Logout
  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  // Cargar horas ocupadas
  const cargarHoras = async (fecha) => {
    const { data } = await supabase
      .from("citas")
      .select("hora")
      .eq("fecha", fecha);

    setHorasOcupadas(
      data?.map((r) => r.hora.toString().slice(0, 5)) || []
    );
  };

  //  Reservar hora
  const reservarHora = async (hora) => {
    if (horasOcupadas.includes(hora)) {
      setMensaje("⛔ Esa hora ya está ocupada");
      return;
    }

    const { error } = await supabase.from("citas").insert({
      fecha: fechaSeleccionada,
      hora,
      cliente_id: user.id,
      estado: "pendiente",
    });


if (error) {
    console.error(error);

    // Si sale error.code === "23505" muestra mensaje
    if (error.code === "23505") {
      setMensaje("⚠️ Ya tienes una cita registrada para el dia: " +citaUsuario.fecha+ " a las:" + citaUsuario.hora );
    } else {
      setMensaje("❌ Error al reservar");
    }

    return; 
  }
    // ✅ SOLO si todo ha ido bien
  setMensaje("✅ Cita reservada correctamente");
  cargarHoras(fechaSeleccionada);
  setCitaUsuario({ fecha: fechaSeleccionada, hora });
  };


  const nombre = profile?.nombre || "Usuario";

  if (user === undefined || profile === null) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-light p-3">
      <h1 className="text-center">Reservar Cita</h1>

      {/* Header con cita */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        <p className="mb-0">
          Hola {nombre} -{" "}
          {citaUsuario
            ? `Tienes cita el ${citaUsuario.fecha} a las ${citaUsuario.hora}`
            : "No tienes cita seleccionada"}
        </p>
        <button className="btn btn-success ms-3" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      {/* Calendario */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={esLocale}
          dateClick={(info) => {
            setFechaSeleccionada(info.dateStr);
            cargarHoras(info.dateStr);
            setMostrarModal(true);
            setMensaje("");
          }}
        />
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="modal-overlay container">
          <div className="modal-content">
            <h2>Horas disponibles</h2>
            <p>{fechaSeleccionada}</p>

            <div className="horas-grid">
              {HORAS.map((hora) => {
                const ocupada = horasOcupadas.includes(hora);
                return (
                  <button
                    key={hora}
                    disabled={ocupada}
                    onClick={() => reservarHora(hora)}
                    className={ocupada ? "hora-ocupada" : "hora-libre"}
                  >
                    {hora}
                  </button>
                );
              })}
            </div>

            {mensaje && <p
              className="mensaje">{mensaje}</p>}

            <button 
            className="cerrar-btn"
            onClick={() => setMostrarModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}