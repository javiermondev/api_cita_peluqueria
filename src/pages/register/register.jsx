import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Simulación de registro
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: form.name,
        email: form.email,
      })
    );

    navigate("/dashboard");
  };

  return (

<div className="bg-home min-vh-100">

<div className="d-flex justify-content-center align-items-center vh-100 ">
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
            name="name"
            className="form-control"
            value={form.name}
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

        <button className="btn btn-primary w-100 mb-3">
          Registrarse
        </button>

        <p className="text-center">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
    </div>
    </div>
  );
}
