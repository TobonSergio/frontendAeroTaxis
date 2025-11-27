import React from "react";

function ChoferForm({
  formData,
  isEditing,
  loading,
  message,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="p-4 bg-dark rounded shadow-sm">
      <h2 className="mb-4">
        {isEditing ? "Editar Chofer" : "Nuevo Chofer"}
      </h2>

      <form onSubmit={onSubmit}>
        <div className="row g-3">

          {/* Nombre */}
          <div className="col-12 col-md-6">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={onChange}
              required
            />
          </div>

          {/* Apellido */}
          <div className="col-12 col-md-6">
            <label className="form-label">Apellido</label>
            <input
              className="form-control"
              name="apellido"
              value={formData.apellido}
              onChange={onChange}
              required
            />
          </div>

          {/* Correo */}
          <div className="col-12 col-md-6">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              name="correo"
              value={formData.correo}
              onChange={onChange}
              required
            />
          </div>

          {/* Teléfono */}
          <div className="col-12 col-md-6">
            <label className="form-label">Teléfono</label>
            <input
              className="form-control"
              name="telefono"
              value={formData.telefono}
              onChange={onChange}
              required
            />
          </div>

          {/* Licencia */}
          <div className="col-12">
            <label className="form-label">Licencia de Conducción</label>
            <input
              className="form-control"
              name="licenciaConduccion"
              value={formData.licenciaConduccion}
              onChange={onChange}
              required
            />
          </div>

          {/* Bilingüe */}
          <div className="col-12 d-flex align-items-center gap-2 mt-2">
            <label className="form-label mb-0">Bilingüe:</label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                name="bilingue"
                checked={formData.bilingue}
                onChange={onChange}
              />
            </div>
          </div>

          {/* Campos solo si NO está editando */}
          {!isEditing && (
            <>
              {/* Usuario */}
              <div className="col-12 col-md-6">
                <label className="form-label">Usuario</label>
                <input
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={onChange}
                  required
                />
              </div>

              {/* Contraseña */}
              <div className="col-12 col-md-6">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                  required
                />
              </div>
            </>
          )}

        </div>

        {/* Botones */}
        <div className="mt-4 d-flex flex-column flex-md-row gap-3">
          <button type="submit" className="btn btn-danger" disabled={loading}>
            {loading
              ? "Procesando..."
              : isEditing
              ? "Actualizar Chofer"
              : "Crear Chofer"}
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

      {/* Mensaje */}
      {message && <p className="mt-3 text-info">{message}</p>}
    </section>
  );
}

export default ChoferForm;
