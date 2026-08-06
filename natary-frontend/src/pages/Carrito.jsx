import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Index.css";

import logo from "../assets/logo.webp";

function Carrito() {

    const navigate = useNavigate();
    const [carrito, setCarrito] = useState([]);

    const [mostrarModal, setMostrarModal] = useState(false);
    
    const [mensajeStock, setMensajeStock] = useState({});
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null")?.nombre;
    const token = localStorage.getItem("token");
    const cerrarSesion = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  navigate("/");
};
  
const cargarCarrito = () => {
    axios.get("http://localhost:4000/api/carrito", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        console.log("DATOS DEL CARRITO:", res.data);
        setCarrito(res.data);
    })
    .catch(err => console.log(err));
};

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        cargarCarrito();
    }, []);

const cambiarCantidad = (producto, accion) => {

  const stock = producto.stock_pro ?? 0;

  if (accion === "sumar" && producto.cantidad >= stock) {

    setMensajeStock(prev => ({
      ...prev,
      [producto.cve_pro]: "Ya no hay más disponibles en stock"
    }));

    return;
  }

  axios.put("http://localhost:4000/api/carrito", {
    cve_pro: producto.cve_pro,
    accion
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(() => {

    setMensajeStock(prev => ({
      ...prev,
      [producto.cve_pro]: ""
    }));

    cargarCarrito();
  });
};

    const confirmarCompra = () => {

    axios.post(
        "http://localhost:4000/api/compra",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then(res => {

        if(res.data.success){

            alert("Compra realizada correctamente");

            setMostrarModal(false);

            cargarCarrito();

        }

    })
    .catch(err => {

    if (err.response?.status === 401) {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        navigate("/login");

        return;
    }

    console.log(err);

});
    };

    const total = carrito.reduce(
        (suma, p) => suma + (p.precio_pro * p.cantidad),
        0
    );

    return (
        <main className="pagina">

            {/* HEADER (igual que catálogo) */}
            <header className="header">

                <div className="logo">
                    <img src={logo} alt="NATARY" />
                    <span>NATARY</span>
                </div>

                 <nav className="menu">

  {/* NO LOGUEADO */}
  {!usuario && (
    <>
      <button onClick={() => navigate("/")}>
        Inicio
      </button>

      <button onClick={() => navigate("/catalogo")}>
        Catálogo
      </button>

      <button onClick={() => navigate("/login")}>
        Iniciar sesión
      </button>
    </>
  )}

  {/* LOGUEADO */}
  {usuario && (
    <>
      <button onClick={() => navigate("/catalogo")}>
        Catálogo
      </button>

      <button onClick={() => navigate("/carrito")}>
        Carrito
      </button>

      <button onClick={() => navigate("/mis-compras")}>
    Mis compras
</button>

      <button onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </>
  )}

</nav>

                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
                />
            </header>
<main>
            {/* CONTENIDO */}
            <div className="container mt-4">

                <h2 className="text-center mt-4">
                    MI CARRITO
                </h2>

                {carrito.length === 0 ? (
                    <h4 className="text-center mt-5">
                        Carrito vacío
                    </h4>
                ) : (

                    carrito.map(p => (
    <div className="card m-3" key={p.cve_pro}>
        <div className="card-body carrito-item">

            {/* IMAGEN IZQUIERDA */}
            <img
            loading="lazy"
                src={"http://localhost:4000/uploads/" + p.img_pro}
                className="carrito-img"
                alt={p.nombre_pro}
            />

            {/* INFO DERECHA */}
            <div className="carrito-info">

                <h4>{p.nombre_pro}</h4>

                <p>Precio: ${p.precio_pro}</p>

                <p>Cantidad: {p.cantidad}</p>

               
                {/* BOTONES CENTRADOS */}
                <div className="carrito-botones">

                    <button
  className="btn btn-warning"
  onClick={() => cambiarCantidad(p, "restar")}
  disabled={p.cantidad <= 1}
>
  -
</button>

                    <button
                        className="btn btn-primary"
                        onClick={() => cambiarCantidad(p, "sumar")}
                        disabled={p.cantidad >= p.stock_pro}
                    >
                        +
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={() => cambiarCantidad(p, "eliminar")}
                    >
                        Eliminar
                    </button>

                </div>

                <h5 className="mt-3">
                    Subtotal: ${p.precio_pro * p.cantidad}
                </h5>
             
            {mensajeStock[p.cve_pro] && (
  <div className="alert alert-danger mt-2 p-2 text-center">
    {mensajeStock[p.cve_pro]}
  </div>
)}
            </div>
        </div>
    </div>
))
                )}

                <hr />

                <h3 className="text-center">
                    Total: ${total}
                </h3>

                <div className="text-center">
                    <button
                        className="btn btn-success mt-3"
                        onClick={() => setMostrarModal(true)}
                    >
                        Comprar
                    </button>
                </div>

            </div>

{mostrarModal && (

<div className="modal-overlay">

    <div className="ticket-compra">

        <h3>Resumen de compra</h3>

        <p className="text-center">
            Gracias por comprar en NATARY
        </p>

        <hr />

        {carrito.map(item => (

            <div
                key={item.cve_pro}
                className="ticket-item"
            >

                <span>
                    {item.nombre_pro}
                </span>

                <span>
                    {item.cantidad} x ${item.precio_pro}
                </span>

            </div>

        ))}

        <hr />

        <h4>
            Total: ${total}
        </h4>

        <button
            className="btn btn-success w-100 mt-3"
            onClick={confirmarCompra}
        >
            Confirmar compra
        </button>

        <button
            className="btn btn-danger w-100 mt-2"
            onClick={() => setMostrarModal(false)}
        >
            Cancelar
        </button>

    </div>

</div>

)}
</main>
        {/* FOOTER */}
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

export default Carrito;