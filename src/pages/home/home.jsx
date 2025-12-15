import { Link } from "react-router-dom";
import "./home.css";



// export default function Home() {
//   return (
//      <div className="bg-home min-vh-100">
//     <div className="container col-lg-2 text-center d-flex flex-column align-items-center justify-content-center vh-50 bg-light">
//       <h1 className="mb-4 bg-secondary">Bienvenido a Peluquería Loli</h1>
//       <p>Reserva tu cita en tu peluquería favorita</p>

//       <div className="mt-4 ">
//         <Link to="/login" className="btn btn-primary me-3">
//           Iniciar sesión
//         </Link>
//         <Link to="/register" className="btn btn-outline-secondary">
//           Registrarse
//         </Link>
//       </div>
//     </div>
//     </div>
//   );
// }

export default function Home() {
  return (
    <div className="bg-home min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center p-4 rounded  bg-light" style={{ width: "600px" }} >
        <h1 className="mb-4  p-2 rounded">Peluquería Loli</h1>
        <p>Reserva tu cita en tu peluquería favorita</p>

        <div className="mt-4">
          <Link to="/login" className="btn btn-primary me-3">
            Iniciar sesión
          </Link>
          <Link to="/register" className="btn btn-outline-secondary">
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}

