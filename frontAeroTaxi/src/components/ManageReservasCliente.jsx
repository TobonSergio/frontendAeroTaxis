import { useState, useEffect } from "react";
import reservaServiceCliente from "../services/reservaServiceCliente.js";
import rutaService from "../services/rutaService.js";
import { useAuth } from "../hooks/useAuth.js";

function CreateReservaCliente() {
  const { user } = useAuth();
  const [rutas, setRutas] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ultimaReserva, setUltimaReserva] = useState(null); // 👈 guardará la reserva creada

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

  // 🔹 Crear la reserva
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("Debes iniciar sesión para crear una reserva");
      return;
    }

    setLoading(true);
    setMessage("");

    // Extraer hora desde fechaReserva
    const fecha = formData.fechaReserva;
    const hora = fecha ? fecha.split("T")[1] + ":00" : null;

    const payload = {
      idCliente: user.idCliente, // 👈 asegúrate de que user.idCliente exista
      idRuta: formData.idRuta,
      lugarRecogida: formData.lugarRecogida,
      destino: formData.destino,
      fechaReserva: formData.fechaReserva,
      horaReserva: hora,
      comentarios: formData.comentarios,
    };

    console.log("📦 Enviando payload:", payload);

    try {
      const response = await reservaServiceCliente.create(payload);

      // ✅ Guardamos la reserva creada (usa la data devuelta del backend)
      setUltimaReserva(response);

      setMessage("✅ Reserva creada correctamente");

      // Reiniciar formulario
      setFormData({
        idRuta: "",
        lugarRecogida: "",
        destino: "",
        fechaReserva: "",
        comentarios: "",
      });
    } catch (error) {
      console.error("❌ Error al crear la reserva:", error.response?.data || error);
      setMessage(
        `❌ Error: ${
          error.response?.data?.message || "Verifica los datos e inténtalo nuevamente"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Descargar PDF usando el service correcto
  const handleDownloadPdf = async () => {
    if (!ultimaReserva || !ultimaReserva.idReserva) {
      console.warn("⚠️ No hay una reserva válida para descargar PDF");
      return;
    }

    try {
      await reservaServiceCliente.downloadPDF(ultimaReserva.idReserva);
    } catch (error) {
      console.error("❌ Error al descargar PDF:", error);
      setMessage("❌ No se pudo descargar el PDF");
    }
  };

  // 🔹 Descargar QR usando el service correcto
  const handleDownloadQr = async () => {
    if (!ultimaReserva || !ultimaReserva.idReserva) {
      console.warn("⚠️ No hay una reserva válida para descargar QR");
      return;
    }

    try {
      await reservaServiceCliente.downloadQR(ultimaReserva.idReserva);
    } catch (error) {
      console.error("❌ Error al descargar QR:", error);
      setMessage("❌ No se pudo descargar el QR");
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

      {/* 🔹 Botones de descarga solo si hay una reserva creada */}
      {ultimaReserva && (
        <div className="download-buttons">
          <h3>Descargar documentos:</h3>
          <button onClick={handleDownloadPdf}>📄 Descargar PDF</button>
          <button onClick={handleDownloadQr}>🔳 Descargar QR</button>
        </div>
      )}
    </div>
  );
}

export default CreateReservaCliente;
