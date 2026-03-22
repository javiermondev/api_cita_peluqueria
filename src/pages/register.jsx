import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/fondoGlobal.css";
import { supabase } from "../lib/supabase.js";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    apellidos: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  

const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  // Crear usuario en Auth
  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      data: {
        name: form.name,
      },
    },
  });

  if (error) {
    if (error.message.includes("Password should be at least 6 characters")) {
      setMessage("La contraseña debe tener al menos 6 caracteres");
    } else {
      setMessage(error.message);
    }
    return;
  }

  // Insertar datos en la tabla profiles
  await supabase.from("profiles").insert({
    id: data.user.id, // <-- MUY IMPORTANTE
    nombre: form.name,
    apellidos: form.apellidos,
    telefono: form.telefono,
    email: form.email
  });

  setMessage("Usuario registrado. Revisa tu email para confirmar la cuenta.");

  navigate("/dashboard");
};


  return (
    <div className="bg-home min-vh-100">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container bg-light p-4 rounded" style={{ maxWidth: "500px" }}>
          <h2 className="mb-4 text-center">Crear cuenta</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Apellidos</label>
              <input
                type="text"
                name="apellidos"
                className="form-control"
                value={form.apellidos}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

              <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
              type="tel"
              name="telefono"
              pattern="[0-9]{9}"
                className="form-control"
                value={form.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Repetir contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-success w-100 mb-3">
              Registrarse
            </button>

            <p className="text-center text-danger">{message}</p>

            <p className="text-center">
              ¿Ya tienes cuenta?{" "}
              <Link className="btn text-success" to="/login">
                Inicia sesión
              </Link>
            </p>
          
          </form>
            <div className="text-center">
            <button className="btn btn-success text-light"  onClick={() => navigate("/")}>
               {/* <Link className="btn btn-success text-light" to="/"> */}
               Volver
               {/* </Link> */}
              
              
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}
