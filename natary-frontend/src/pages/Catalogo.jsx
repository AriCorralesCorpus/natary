import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Index.css";
import logo from "../assets/logo.avif";

function Catalogo() {

    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);

    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

    useEffect(() => {
        if (!usuario) {
            navigate("/login");
        }
    }, [usuario, navigate]);

    if (!usuario) {
        return null;
    }

    useEffect(() => {
        axios.get("https://natary-production.up.railway.app/api/productos")
            .then(res => {
                setProductos(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/");
    };

    const agregarCarrito = async (producto) => {

        const token = localStorage.getItem("token");

        const respuesta = await fetch("https://natary-production.up.railway.app/api/carrito", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                cve_pro: producto.cve_pro,
                accion: "sumar"
            })
        });

        const data = await respuesta.json();
        console.log(data);

        alert("Producto agregado al carrito");
    };

    return (
        <main className="pagina">

            {/* HEADER */}
            <header className="header">

                <div className="logo">
                    <img src={logo} alt="NATARY" />
                    <span>NATARY</span>
                </div>

                <nav className="menu">

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

                </nav>

                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
                />
            </header>

            {/* CONTENIDO */}
            <main>

                <div className="container mt-4">

                    <h2 className="text-center mt-4">
                        CATÁLOGO DE PRODUCTOS NATARY
                    </h2>

                    <div className="row">

                        {productos.map(p => (

                            <div className="col-md-4" key={p.cve_pro}>

                                {/*AQUÍ ESTÁ EL EVENTO DE LA PRÁCTICA 8 */}
                                <div
                                    className="card m-3 producto-card"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.classList.add("activo");
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.classList.remove("activo");
                                    }}
                                >

                                    <img
                                        src={"https://natary-production.up.railway.app/uploads/" + p.img_pro}
                                        className="card-img-top"
                                        height="200"
                                    />

                                    <div className="card-body">

                                        <h5>{p.nombre_pro}</h5>
                                        <p>${p.precio_pro}</p>

                                        {p.stock_pro > 0 ? (
                                            <>
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => {
                                                        agregarCarrito(p);
                                                        setTimeout(() => {
                                                            navigate("/carrito");
                                                        }, 500);
                                                    }}
                                                >
                                                    Añadir
                                                </button>

                                                <p className="text-success">
                                                    Disponible: {p.stock_pro}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-secondary" disabled>
                                                    Sin stock
                                                </button>

                                                <p className="text-danger">
                                                    Producto no disponible
                                                </p>
                                            </>
                                        )}

                                    </div>
                                </div>

                            </div>

                        ))}

                    </div>

                </div>

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
    <p>éxico</p>
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

export default Catalogo;