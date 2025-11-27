import React from "react";

function UnidadForm({
  formData,
  isEditing,
  loading,
  message,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="p-4 bg-dark text-light rounded shadow-sm">
      <h2 className="mb-4">
        {isEditing ? "✏️ Editar Unidad" : "➕ Nueva Unidad"}
      </h2>

      <form onSubmit={onSubmit}>
        <div className="row g-3">

          {/* Placa */}
          <div className="col-md-6">
            <label className="form-label">Placa</label>
            <div className="input-group">
              <span className="input-group-text">
                🚗
              </span>
              <input
                type="text"
                className="form-control"
                name="placa"
                value={formData.placa}
                onChange={onChange}
                required
              />
            </div>
          </div>

          {/* Serie */}
          <div className="col-md-6">
            <label className="form-label">Serie</label>
            <input
              type="text"
              className="form-control"
              name="serie"
              value={formData.serie}
              onChange={onChange}
              required
            />
          </div>

          {/* Fotografía */}
          <div className="col-md-12">
            <label className="form-label">Fotografía (URL)</label>
            <div className="input-group">
              <span className="input-group-text">🌐</span>
              <input
                type="text"
                className="form-control"
                name="fotografia"
                value={formData.fotografia}
                onChange={onChange}
              />
            </div>
          </div>

          {/* Tipo Taxi */}
          <div className="col-md-6">
            <label className="form-label">Tipo de Taxi</label>
            <select
              className="form-select"
              name="tipoTaxi"
              value={formData.tipoTaxi}
              onChange={onChange}
              required
            >
              <option value="NORMAL">NORMAL</option>
              <option value="TURISTICO">TURISTICO</option>
            </select>
          </div>

          {/* Estado */}
          <div className="col-md-6">
            <label className="form-label">Estado</label>
            <select
              className="form-select"
              name="estado"
              value={formData.estado}
              onChange={onChange}
              required
            >
              <option value="DISPONIBLE">DISPONIBLE</option>
              <option value="OCUPADA">OCUPADA</option>
              <option value="MANTENIMIENTO">MANTENIMIENTO</option>
            </select>
          </div>

        </div>

        {/* Botones */}
        <div className="mt-4 d-flex gap-3">
          <button type="submit" className="btn btn-danger" disabled={loading}>
            {loading
              ? "Procesando..."
              : isEditing
              ? "Actualizar Unidad"
              : "Crear Unidad"}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {message && <p className="mt-3 text-info">{message}</p>}
    </section>
  );
}

export default UnidadForm;
