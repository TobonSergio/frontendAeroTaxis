// src/components/CreateReservaStaff.jsx
import { useState, useEffect } from "react";
import reservaServiceCliente from "../services/reservaServiceCliente.js";
import rutaService from "../services/rutaService.js";
import { useAuth } from "../hooks/useAuth.js";

function CreateReservaStaff({ onCreated }) {
  const { user } = useAuth();
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    idRuta: "",
    lugarRecogida: "",
    destino: "",
    fechaReserva: "",
    comentarios: "",
  });

  // Cargar rutas
  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const data = await rutaService.getAll();
        setRutas(data);
      } catch (error) {
        console.error("❌ Error al cargar rutas:", error);
      }
    };

    fetchRutas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // obtener hora
    const fecha = formData.fechaReserva;
    const hora = fecha ? fecha.split("T")[1] + ":00" : null;

    const payload = {
      idStaff: user.idPerfil, // 🔥 Staff creando su propia reserva
      idRuta: formData.idRuta,
      lugarRecogida: formData.lugarRecogida,
      destino: formData.destino,
      fechaReserva: formData.fechaReserva,
      horaReserva: hora,
      comentarios: formData.comentarios,
    };

    try {
      await reservaServiceCliente.create(payload);
      setMessage("Reserva creada correctamente ✔");

      setFormData({
        idRuta: "",
        lugarRecogida: "",
        destino: "",
        fechaReserva: "",
        comentarios: "",
      });

      if (onCreated) onCreated();
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Error al crear la reserva ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">

          <div className="card shadow-lg bg-dark text-light border-secondary">

            <div className="card-header bg-dark text-dark text-center fw-bold text-white">
              Crear Reserva (Staff)
            </div>

            <div className="card-body">
              {message && (
                <div
                  className={`alert ${
                    message.includes("Error") ? "alert-danger" : "alert-success"
                  }`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">

                  {/* RUTA */}
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Ruta</label>
                    <select
                      name="idRuta"
                      className="form-select"
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
                  </div>

                  {/* LUGAR */}
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Lugar de Recogida</label>
                    <input
                      type="text"
                      name="lugarRecogida"
                      className="form-control"
                      value={formData.lugarRecogida}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* DESTINO */}
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Destino</label>
                    <input
                      type="text"
                      name="destino"
                      className="form-control"
                      value={formData.destino}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* FECHA */}
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Fecha y Hora</label>
                    <input
                      type="datetime-local"
                      name="fechaReserva"
                      className="form-control"
                      value={formData.fechaReserva}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* COMENTARIOS */}
                  <div className="col-12 mb-3">
                    <label className="form-label">Comentarios</label>
                    <input
                      type="text"
                      name="comentarios"
                      className="form-control"
                      value={formData.comentarios}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <button className="btn btn-danger w-100" disabled={loading}>
                  {loading ? "Procesando..." : "Crear Reserva"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CreateReservaStaff;
