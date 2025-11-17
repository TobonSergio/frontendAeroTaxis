import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import "../styles/styleActionButtons.css"; // 👈 importamos los estilos específicos

/**
 * Componente reutilizable para botones de acción (Editar / Eliminar)
 * 
 * Props:
 * - onEdit: función al hacer clic en editar
 * - onDelete: función al hacer clic en eliminar
 * - size: tamaño del ícono (por defecto 18)
 */
function ActionButtons({ onEdit, onDelete, size = 18 }) {
  return (
    <div className="action-buttons">
      <button className="btn-edit" onClick={onEdit} title="Editar">
        <FiEdit size={size} />
      </button>
      <button className="btn-delete" onClick={onDelete} title="Eliminar">
        <FiTrash2 size={size} />
      </button>
    </div>
  );
}

export default ActionButtons;
