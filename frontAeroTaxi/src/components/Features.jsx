import Grid from "../components/Grids";
import "../styles/styleFeatures.css";

function Features() {
  return (
    <section className="features" id="services">
      <h2>¿Qué ofrecemos?</h2>
      <Grid>
        <div className="feature-card">
          <h3>🚕 Taxi Normal</h3>
          <p>Traslado rápido y seguro en taxis de 4 plazas.</p>
        </div>
        <div className="feature-card">
          <h3>🚌 Taxi Turístico</h3>
          <p>Vehículos de más plazas para grupos y recorridos turísticos.</p>
        </div>
        <div className="feature-card">
          <h3>🌍 Chofer Bilingüe</h3>
          <p>Conduce en Español e Inglés para tu comodidad.</p>
        </div>
        <div className="feature-card">
          <h3>📅 Reservas por días</h3>
          <p>Elige entre un traslado único o múltiples días de servicio.</p>
        </div>
      </Grid>
    </section>
  );
}
export default Features;