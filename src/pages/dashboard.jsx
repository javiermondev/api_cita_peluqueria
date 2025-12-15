export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p>No autorizado</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Bienvenido 👋</h2>
      <p>Desde aquí puedes reservar tu cita</p>
    </div>
  );
}
