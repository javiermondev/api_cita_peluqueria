import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulamos login
    localStorage.setItem("user", JSON.stringify({ email: "test@test.com" }));

    navigate("/dashboard");
  };

  return (

    <div className="bg-home min-vh-100">

    
    <div className="d-flex justify-content-center align-items-center vh-100 ">
    <div className="container bg-light p-4 rounded" style={{ maxWidth: "500px" }}>
    <div>
      <h2 className="text-center">Iniciar sesión</h2>

      <form onSubmit={handleLogin}>
        <input className="form-control mb-3" placeholder="Email" />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Contraseña"
        />

<div className="text-center">
        <button className="btn btn-success">Entrar</button>
        </div>
      </form>
    </div>
    </div>
    </div>
     </div>
     
  );
}
