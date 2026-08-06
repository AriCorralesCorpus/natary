import { useNavigate } from "react-router-dom";
import "./Index.css";

function Terminos() {
  const navigate = useNavigate();

  return (
    <main className="pagina">

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <span>NATARY</span>
        </div>

        <button onClick={() => navigate("/")}>
          ← Regresar
        </button>
      </header>

      {/* CONTENIDO */}
      <section className="legal">

        <h1>Términos de Uso</h1>

        <h3>Uso del sitio</h3>
        <p>
          El usuario se compromete a utilizar este sitio de forma responsable.
        </p>

        <h3>Productos</h3>
        <p>
          Los productos son artesanales y pueden variar ligeramente.
        </p>

        <h3>Compras</h3>
        <p>
          Todas las compras están sujetas a disponibilidad.
        </p>

        <h3>Modificaciones</h3>
        <p>
          NATARY puede modificar estos términos sin previo aviso.
        </p>

        <p style={{ marginTop: "30px", fontWeight: "bold" }}>
          Última actualización: junio 2026
        </p>

      </section>

    </main>
  );
}

export default Terminos;