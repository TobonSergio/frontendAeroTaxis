import "../styles/styleAboutUs.css";
import Grid from "../components/Grids";

function AboutUs() {
  return (
    <section id="about-us" className="about-us">
      <div className="about-container">
        <h2 className="about-title">Sobre Nosotros</h2>
        <p className="about-text">
          En <strong>Aero Taxis México</strong> ofrecemos un servicio especializado en traslados desde y hacia el aeropuerto.  
          Nuestro objetivo es que disfrutes de un transporte seguro, confiable y adaptado a tus necesidades desde el primer momento que llegas a México.  
          Con choferes capacitados, opciones bilingües y vehículos cómodos, hacemos que tu viaje comience de la mejor manera.
        </p>
        <Grid>
          <div className="card">
            <h3>Atención Personalizada</h3>
            <p>
              Cada pasajero recibe un servicio adaptado a sus necesidades, desde preferencias de vehículo hasta asistencia durante el viaje.
            </p>
          </div>

          <div className="card">
            <h3>Puntualidad Garantizada</h3>
            <p>
              Nuestros choferes llegan a tiempo a tu destino, asegurando que tu traslado desde y hacia el aeropuerto sea siempre puntual.
            </p>
          </div>

          <div className="card">
            <h3>Calidad y Confiabilidad</h3>
            <p>
              Vehículos en perfecto estado y conductores certificados para que cada viaje sea seguro, cómodo y sin complicaciones.
            </p>
          </div>
        </Grid>

      </div>
    </section>
  );
}

export default AboutUs;
