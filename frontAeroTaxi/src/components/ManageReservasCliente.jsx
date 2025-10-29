import { useState, useEffect } from "react";
import reservaServiceCliente from "../services/reservaServiceCliente.js";
import rutaService from "../services/rutaService.js";
import { useAuth } from "../hooks/useAuth.js";

function CreateReservaCliente() {
  const { user } = useAuth();
  const [rutas, setRutas] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    idRuta: "",
    lugarRecogida: "",
    destino: "",
    fechaReserva: "",
    comentarios: "",
  });

  // 🔹 Cargar rutas disponibles
  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const data = await rutaService.getAll();
        setRutas(data);
      } catch (error) {
        console.error("Error al cargar rutas:", error);
      }
    };
    fetchRutas();
  }, []);


  // 🔹 Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
console.log("👤 Usuario actual:", user);

  // 🔹 Enviar la reserva al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("Debes iniciar sesión para crear una reserva");
      return;
    }

    setLoading(true);
    setMessage("");

    // Extraer la hora desde fechaReserva
    const fecha = formData.fechaReserva;
    const hora = fecha ? fecha.split("T")[1] + ":00" : null; // ejemplo "14:00:00"

    console.log("aqui se muestra nuestro user antes del payload");
    console.log(user);

    const payload = {
      idCliente: user.idCliente, // 👈 asegúrate de que user.idCliente existe en el hook useAuth
      idRuta: formData.idRuta,
      lugarRecogida: formData.lugarRecogida,
      destino: formData.destino,
      fechaReserva: formData.fechaReserva, // formato "YYYY-MM-DDTHH:mm"
      horaReserva: hora,
      comentarios: formData.comentarios,
    };
    console.log("aqui se muestra nuestro payload");
    console.log(payload);

    try {
      await reservaServiceCliente.create(payload);
      setMessage("✅ Reserva creada correctamente");
      setFormData({
        idRuta: "",
        lugarRecogida: "",
        destino: "",
        fechaReserva: "",
        comentarios: "",
      });
    } catch (error) {
      console.error("Error al crear la reserva:", error.response?.data || error);
      setMessage(
        `❌ Error al crear la reserva: ${
          error.response?.data?.message || "Verifica los datos e inténtalo nuevamente"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-reserva-container">
      <h2>Crear Reserva</h2>

      <form onSubmit={handleSubmit} className="reserva-form">
        <label>
          Ruta:
          <select
            name="idRuta"
            value={formData.idRuta}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una ruta</option>
            {rutas.map((ruta) => (
              <option key={ruta.id} value={ruta.id}>
                {ruta.inicio} → {ruta.fin}
              </option>
            ))}
          </select>
        </label>

        <label>
          Lugar de recogida:
          <input
            type="text"
            name="lugarRecogida"
            value={formData.lugarRecogida}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Destino:
          <input
            type="text"
            name="destino"
            value={formData.destino}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Fecha y hora:
          <input
            type="datetime-local"
            name="fechaReserva"
            value={formData.fechaReserva}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Comentarios:
          <input
            type="text"
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Crear Reserva"}
        </button>
      </form>

      {message && <p className="text-message">{message}</p>}
    </div>
  );
}

export default CreateReservaCliente;
