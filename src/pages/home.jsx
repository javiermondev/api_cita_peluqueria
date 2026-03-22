import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/fondoGlobal.css";


export default function Home() {
  return (
    <div className="bg-home min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center p-4 rounded  bg-light" style={{ width: "600px" }} >
        <h1 className="mb-4  p-2 rounded">Peluquería Loli</h1>
        <p>Reserva tu cita en tu peluquería favorita</p>

        <div className="mt-4">
          <Link to="/login" className="btn btn-success me-3">
            Iniciar sesión
          </Link>
          <Link to="/register" className="btn btn-outline-success">
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}

