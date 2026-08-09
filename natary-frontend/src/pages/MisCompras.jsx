import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Index.css";

import logo from "../assets/logo.avif";

function MisCompras() {

  const navigate = useNavigate();
  const [compras, setCompras] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [mostrar, setMostrar] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario") || "null")?.nombre;
  const token = localStorage.getItem("token");

  const cargar = () => {
    axios.get("https://natary-production.up.railway.app/api/mis-compras", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setCompras(res.data))
      .catch(err => {
        console.log("ERROR BACKEND:", err.response?.data || err);
      });
  };

  useEffect(() => {
    cargar();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const verDetalle = (folio) => {
    const items = compras.filter(c => c.folio_compra === folio && c.cve_pro);
    setDetalle(items);
    setMostrar(true);
  };

  const total = detalle.reduce(
    (s, p) => s + p.precio_pro * p.cantsol_com,
    0
  );

  return (
    <main className="pagina">

      {/* HEADER */}
      <header className="header">

        <div className="logo">
          <img src={logo} alt="NATARY" />
          <span>NATARY</span>
        </div>

        <nav className="menu">

          {!usuario && (
            <>
              <button onClick={() => navigate("/")}>Inicio</button>
              <button onClick={() => navigate("/catalogo")}>Catálogo</button>
              <button onClick={() => navigate("/login")}>Iniciar sesión</button>
            </>
          )}

          {usuario && (
            <>
              <button onClick={() => navigate("/catalogo")}>Catálogo</button>
              <button onClick={() => navigate("/carrito")}>Carrito</button>
              <button disabled>Mis compras</button>
              <button onClick={cerrarSesion}>Cerrar sesión</button>
            </>
          )}

        </nav>
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
      </header>
<main>
      {/* CONTENIDO */}
      <div className="container mt-4">

        <h2 className="text-center">Mis Compras</h2>

        {compras.length === 0 ? (
          <h4>No tienes compras</h4>
        ) : (
          [...new Set(compras.map(c => c.folio_compra))].map(folio => {

            const items = compras.filter(c => c.folio_compra === folio && c.cve_pro);

            return (
              <div className="card m-3 p-3" key={folio}>

                <h5>Compra: {folio}</h5>

                <p>Fecha: {items[0].fecha}</p>

                <p>Productos: {items.length}</p>

                <p>
                  Total: ${items.reduce(
                    (s, p) => s + p.precio_pro * p.cantsol_com,
                    0
                  )}
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => verDetalle(folio)}
                >
                  Ver detalle
                </button>

              </div>
            );
          })
        )}

        {/* MODAL */}
        {mostrar && (
          <div className="ticket-overlay">
            <div className="ticket-modal">

              <h3>Detalle de compra</h3>

              {detalle.map((p, i) => (
                <div key={i} className="d-flex justify-content-between align-items-center mb-2">

                  <img
                    src={`https://natary-production.up.railway.app/uploads/${p.img_pro}`}
                    width="50"
                    height="50"
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                  />

                  <span style={{ flex: 1, marginLeft: "10px" }}>
                    {p.nombre_pro}
                  </span>

                  <span>x{p.cantsol_com}</span>

                  <strong>
                    ${p.precio_pro * p.cantsol_com}
                  </strong>

                </div>
              ))}

              <hr />

              <h4>Total: ${total}</h4>

              <button
                className="btn btn-danger w-100"
                onClick={() => setMostrar(false)}
              >
                Cerrar
              </button>

            </div>
          </div>
        )}

      </div>
</main>
      <footer className="footer">
      
      
      <div className="footer-contenido">
      
      
      <div className="footer-col">
      
      <h3>
      <img src={logo} alt="NATARY" />
       NATARY
      </h3>
      
      
      <p>
      Figuras tejidas de crochet hechas a mano,
      con diseños únicos y mucho amor.
      </p>
      
      
      </div>
      
      <div className="footer-col contacto-mapa" id="contacto">
      
        {/* COL 1: CONTACTO */}
        <div className="contacto-info">
          <h4>Contacto</h4>
          <p>México</p>
          <p>
        <a href="mailto:contacto@natary.com">contacto@natary.com</a>
      </p>
      
      <p>
        <a href="tel:5512345678">55-1234-5678</a>
      </p>
        </div>
      
        {/* COL 2: MAPA */}
        <div className="contacto-mapa-box">
          <iframe
            title="Ubicación NATARY"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.3841542876357!2d-100.40866872554646!3d20.653944480903142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d35a486363880d%3A0xd927286fe3c75218!2sUTEQ!5e0!3m2!1ses-419!2sus!4v1782329411798!5m2!1ses-419!2sus"
            width="100%"
            height="180"
            style={{ border: 0, borderRadius: "10px" }}
            loading="lazy"
          ></iframe>
        </div>
      
      </div>
      
      <div className="footer-col">
      
      <h4>
      Información
      </h4>
      
      
      <p>
      Mi cuenta
      </p>
      
      <p>
      Preguntas frecuentes
      </p>
      
      <p>
       <button onClick={() => navigate("/privacidad")}>
  Aviso de privacidad
</button>
      </p>
      
      <p>
        <button onClick={() => navigate("/terminos")}>
  Términos del servicio
</button>
      </p>
      
      </div>
      
      
      
      
      
      
      <div className="footer-col redes">
      
      
      <h4>
      Síguenos
      </h4>
      
      
      <div className="iconos">
      
       <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
          <i className="bi bi-facebook"></i>
        </a>
        
        <a href="https://www.instagram.com/like_super_crochet?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" aria-label="Instagram" target="_blank" rel="noreferrer">
          <i className="bi bi-instagram"></i>
        </a>
        
        <a href="https://youtube.com" aria-label="Youtube" target="_blank" rel="noreferrer">
          <i className="bi bi-youtube"></i>
        </a>
      
      
      </div>
      
      
      </div>
      
      
      
      </div>
      
      
      
      
      <div className="footer-bottom">
      
      © 2026 NATARY | Todos los derechos reservados
      
      </div>
      </footer>

    </main>
  );
}

export default MisCompras;