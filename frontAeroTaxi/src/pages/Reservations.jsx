import Sidebar from "../components/Navbar";
import { useEffect, useState } from "react";
import "../styles/styleReservations.css";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newReservation, setNewReservation] = useState({
    clientName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  // Simular carga de reservas
  useEffect(() => {
    const fakeReservations = [
      { id: 1, clientName: "Juan Pérez", email: "juan@example.com", phone: "3001234567", date: "2025-10-01", time: "10:00", notes: "VIP" },
      { id: 2, clientName: "Ana García", email: "ana@example.com", phone: "3109876543", date: "2025-10-02", time: "14:00", notes: "" },
      { id: 3, clientName: "Carlos López", email: "carlos@example.com", phone: "3015554444", date: "2025-10-03", time: "09:30", notes: "Llamar antes" },
    ];

    setTimeout(() => {
      setReservations(fakeReservations);
      setLoading(false);
    }, 500);
  }, []);

  // Crear nueva reserva
  const handleCreateReservation = (e) => {
    e.preventDefault();
    const createdReservation = {
      ...newReservation,
      id: reservations.length + 1,
    };
    setReservations([...reservations, createdReservation]);
    setNewReservation({
      clientName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      notes: "",
    });
    alert("Reserva creada correctamente (modo demo)");
  };

  if (loading) return <p>Cargando reservas...</p>;

  return (
    <div className="reservations-page">
      <Sidebar />
      <main className="reservations-main">
        <header>
          <h1>Gestión de Reservas</h1>
        </header>

        {/* Tabla de reservas */}
        <section>
          <h2>Lista de Reservas</h2>
          <table className="reservations-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Notas</th>
              </tr>
            </thead>
            <tbody>
            {reservations.map((r) => (
                <tr key={r.id}>
                <td data-label="Cliente">{r.clientName}</td>
                <td data-label="Email">{r.email}</td>
                <td data-label="Teléfono">{r.phone}</td>
                <td data-label="Fecha">{r.date}</td>
                <td data-label="Hora">{r.time}</td>
                <td data-label="Notas">{r.notes}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </section>

        {/* Formulario para crear reserva */}
        <section>
          <h2>Crear Nueva Reserva</h2>
          <form className="reservations-form" onSubmit={handleCreateReservation}>
            <label>
              Cliente:
              <input
                value={newReservation.clientName}
                onChange={(e) => setNewReservation({ ...newReservation, clientName: e.target.value })}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={newReservation.email}
                onChange={(e) => setNewReservation({ ...newReservation, email: e.target.value })}
                required
              />
            </label>
            <label>
              Teléfono:
              <input
                value={newReservation.phone}
                onChange={(e) => setNewReservation({ ...newReservation, phone: e.target.value })}
              />
            </label>
            <label>
              Fecha:
              <input
                type="date"
                value={newReservation.date}
                onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
                required
              />
            </label>
            <label>
              Hora:
              <input
                type="time"
                value={newReservation.time}
                onChange={(e) => setNewReservation({ ...newReservation, time: e.target.value })}
                required
              />
            </label>
            <label>
              Notas:
              <input
                value={newReservation.notes}
                onChange={(e) => setNewReservation({ ...newReservation, notes: e.target.value })}
              />
            </label>
            <button type="submit">Crear Reserva</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Reservations;
