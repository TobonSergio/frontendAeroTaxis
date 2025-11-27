import React from "react";
import ChoferCard from "./ChoferCard";
import UnidadCard from "./UnidadCard";

function SeleccionList({ titulo, items, seleccionado, onSeleccionar, tipo }) {
  return (
    <div className="mb-4">
      <h3 className="text-white mb-3">{titulo}</h3>
      <div className="row g-3">
        {items.length === 0 ? (
          <p className="text-white">No hay {tipo}s disponibles.</p>
        ) : (
          items.map((item) => (
            <div key={tipo === "chofer" ? item.idChofer : item.idUnidad} className="col-12 col-sm-6 col-md-4 col-lg-6">

              {tipo === "chofer" ? (
                <ChoferCard chofer={item} seleccionado={seleccionado} onSeleccionar={onSeleccionar} />
              ) : (
                <UnidadCard unidad={item} seleccionado={seleccionado} onSeleccionar={onSeleccionar} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SeleccionList;
