import { useNavigate } from "react-router-dom";
import "./Index.css"; // reutilizamos tu estilo

function Privacidad() {
  const navigate = useNavigate();

  return (
    <main className="pagina">

      {/* HEADER SIMPLE */}
      <header className="header">
        <div className="logo">
          <span>NATARY</span>
        </div>

        <button
          onClick={() => navigate("/")}
        >
          ← Regresar
        </button>
      </header>

      {/* CONTENIDO */}
      <section className="legal">

        <h1>Aviso de Privacidad</h1>

        <p>
          En NATARY respetamos tu privacidad y protegemos los datos personales
          que nos proporcionas al utilizar nuestro sitio web.
        </p>

        <h3>Uso de datos</h3>
        <p>
          Los datos se utilizan únicamente para procesar pedidos y mejorar la experiencia del usuario.
        </p>

        <h3>Protección</h3>
        <p>
          No compartimos información personal con terceros sin consentimiento.
        </p>

        <h3>Contacto</h3>
        <p>
          contacto@natary.com
        </p>

        <p style={{ marginTop: "30px", fontWeight: "bold" }}>
          Última actualización: junio 2026
        </p>

      </section>

    </main>
  );
}

export default Privacidad;