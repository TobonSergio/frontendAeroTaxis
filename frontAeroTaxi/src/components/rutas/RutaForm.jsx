function RutaForm({
  formData,
  setFormData,
  loading,
  isEditing,
  setIsEditing,
  handleSubmit,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="p-4 bg-dark text-light rounded shadow-sm">
      <h2 className="mb-4">
        {isEditing ? "✏️ Editar Ruta" : "Nueva Ruta"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">

          {/* Inicio */}
          <div className="col-12 col-md-6">
            <label className="form-label">Inicio</label>
            <input
              type="text"
              className="form-control"
              name="inicio"
              value={formData.inicio}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fin */}
          <div className="col-12 col-md-6">
            <label className="form-label">Fin</label>
            <input
              type="text"
              className="form-control"
              name="fin"
              value={formData.fin}
              onChange={handleChange}
              required
            />
          </div>

          {/* Precio */}
          <div className="col-12 col-md-6">
            <label className="form-label">Precio</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </div>
          </div>

        </div>

        {/* Botones */}
        <div className="mt-4 d-flex flex-column flex-md-row gap-3">
          <button type="submit" className="btn btn-danger" disabled={loading}>
            {loading
              ? "Procesando..."
              : isEditing
              ? "Actualizar Ruta"
              : "Crear Ruta"}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  idRuta: null,
                  inicio: "",
                  fin: "",
                  precio: "",
                });
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default RutaForm;
