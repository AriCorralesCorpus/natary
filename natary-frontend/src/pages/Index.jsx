import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import bannerNormal from "../assets/banner.avif";
import bannerSanValentin from "../assets/banner_san_valentin.avif";
import bannerPrimavera from "../assets/banner_primavera.avif";
import bannerHalloween from "../assets/banner_halloween.avif";
import bannerNavidad from "../assets/banner_navidad.avif";
import banner1 from "../assets/banner_principal.webp";

import "./Index.css";
import logo from "../assets/logo.avif";
import estambres from "../assets/estambres.avif";
import agujas from "../assets/agujas.avif";
import ganchos from "../assets/ganchos.avif";
import accesorios from "../assets/accesorios.avif";
import { useState, useEffect } from "react";

function Index(){

const navigate = useNavigate();
const [productos, setProductos] = useState([]);
const [mostrarServicios, setMostrarServicios] = useState(false);
const [mostrarQuienes, setMostrarQuienes] = useState(false);
const [bannerEvento, setBannerEvento] = useState(bannerNormal);
const [mensajeEvento, setMensajeEvento] = useState("Diseños Personalizados");
const usuario = JSON.parse(localStorage.getItem("usuario"));

const agregarAlCarrito = async (producto) => {

  const token = localStorage.getItem("token");

  //SI NO HAY TOKEN, LO MANDA A LOGIN
  if (!token) {
    navigate("/login");
    return;
  }

  const res = await fetch("https://natary-production.up.railway.app/api/carrito", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      cve_pro: producto.cve_pro,
      accion: "sumar"
    })
  });

  const data = await res.json();

  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("token");
    navigate("/login");
    return;
  }

  console.log("Agregado:", data);
};

useEffect(() => {

    fetch("https://natary-production.up.railway.app/api/productos")
    .then(res => res.json())
    .then(data => {
        setProductos(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

}, []);
useEffect(() => {

    const hoy = new Date();

    const mes = hoy.getMonth() + 1;
    const dia = hoy.getDate();

    if (mes === 2 && dia <= 14) {

        setBannerEvento(bannerSanValentin);
        setMensajeEvento("Especial de San Valentín");

    }

    else if (mes >= 3 && mes <= 5) {

        setBannerEvento(bannerPrimavera);
        setMensajeEvento("Bienvenida Primavera");

    }

    else if (mes === 10) {

        setBannerEvento(bannerHalloween);
        setMensajeEvento("Colección Halloween");

    }

    else if (mes === 12) {

        setBannerEvento(bannerNavidad);
        setMensajeEvento("Especial de Navidad");

    }

    else {

        setBannerEvento(bannerNormal);
        setMensajeEvento("Diseños Personalizados");

    }

}, []);
return (

<main className="pagina">


{/* HEADER */}

<header className="header">


<div className="logo">
    <img src={logo} alt="NATARY" />

<span>NATARY</span>

</div>

<nav className="menu">

<button onClick={() => navigate("/login")}>
Iniciar Sesión
</button>

<button onClick={() => navigate("/catalogo")}>
Catálogo
</button>

</nav>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
</header>

{/* SUBMENU */}
<div className="submenu">

  <button>Inicio</button>

  {/* SERVICIOS */}
  <div
    className="dropdown"
    onMouseEnter={() => setMostrarServicios(true)}
    onMouseLeave={() => setMostrarServicios(false)}
  >
    <button>Servicios</button>

    {mostrarServicios && (
      <div className="dropdown-box">
        <h4>Servicios</h4>
        <p>* Diseño personalizado de amigurumis</p>
        <p>* Envíos a todo México</p>
        <p>* Regalos especiales</p>
        <p>* Atención personalizada</p>
      </div>
    )}
  </div>

<button
  onClick={() =>
    document.getElementById("contacto").scrollIntoView({ behavior: "smooth" })
  }
>
  Contacto
</button>
  {/* QUIENES SOMOS */}
  <div
    className="dropdown"
    onMouseEnter={() => setMostrarQuienes(true)}
    onMouseLeave={() => setMostrarQuienes(false)}
  >
    <button>Quiénes somos</button>

    {mostrarQuienes && (
      <div className="dropdown-box">
        <h4>NATARY</h4>
        <p>
          Somos una tienda de crochet especializada en figuras hechas a mano con amor,
          dedicación y diseños únicos.
        </p>
      </div>
    )}
  </div>

</div>



{/* HERO */}


<section className="banner-principal">

<Carousel fade interval={5000}>

<Carousel.Item>
<img
className="banner-img"
src={banner1}
alt="Figuras tejidas de crochet hechas a mano"
width="1200"
height="500"
fetchPriority="high"
/>

<Carousel.Caption>
<h2>Figuras Tejidas de Crochet</h2>
<p>Hechas a mano con amor</p>
</Carousel.Caption>
</Carousel.Item>

<Carousel.Item>
<img
className="banner-img"
src={bannerEvento}
alt={mensajeEvento}
width="1200"
height="500"
loading="lazy"
/>

<Carousel.Caption>
    <h2 className="titulo-evento">{mensajeEvento}</h2>
    <p className="texto-evento">
        Descubre nuestras promociones especiales.
    </p>
</Carousel.Caption>
</Carousel.Item>

</Carousel>

</section>
<h2>ELEMENTOS IMPORTANTES</h2>
<section className="categorias">

<div className="categoria">
<img loading="lazy" src={estambres} alt="Estambres"/>
<span>Estambres</span>
</div>

<div className="categoria">
<img loading="lazy" src={agujas} alt="Agujas"/>
<span>Agujas</span>
</div>

<div className="categoria">
<img loading="lazy" src={ganchos} alt="Ganchos"/>
<span>Ganchos</span>
</div>

<div className="categoria">
<img loading="lazy" src={accesorios} alt="Accesorios"/>
<span>Accesorios</span>
</div>

</section>

<section className="productos">

<h2>Lo Último en Crochet</h2>

<div className="productos-grid">

{productos.map((producto) => (

<div
className="producto"
key={producto.cve_pro}
>

<img
  loading="lazy"
  width="300"
  height="300"
  decoding="async"
  src={`https://natary-production.up.railway.app/uploads/${producto.img_pro}`}
  alt={producto.nombre_pro}
/>

<h3>{producto.nombre_pro}</h3>

<p>${producto.precio_pro}</p>

<button
  onClick={() => agregarAlCarrito(producto)}
>
  Agregar al carrito
</button>
</div>

))}

</div>

</section>

{/* CONTENIDO */}


<section className="contenido">


<h2>
¿Por qué elegir NATARY?
</h2>



<div className="cards">


<div className="info-card">

<h3>
Calidad
</h3>

<p>
Cada figura está creada con materiales seleccionados.
</p>

</div>




<div className="info-card">

<h3>
Diseños únicos
</h3>

<p>
Modelos personalizados hechos a mano.
</p>

</div>




<div className="info-card">

<h3>
Compra fácil
</h3>

<p>
Agrega tus productos al carrito y realiza tu pedido.
</p>

</div>


</div>



</section>





{/* LLAMADA A ACCION */}


<section className="accion">


<h2>
Encuentra tu amigurumi favorito 
</h2>


<button
onClick={()=>navigate("/catalogo")}
>

Comprar ahora

</button>


</section>


<section className="newsletter">

<h2>
¡Suscríbete a nuestro boletín!
</h2>

<p>
Entérate de nuestras novedades, promociones especiales,
últimas noticias y mucho más.
</p>

<div className="newsletter-form">

<input
type="email"
placeholder="su-email@ejemplo.com"
/>

<button>
SUSCRIBIRME
</button>

</div>

</section>

{/* CONTACTO (FORMULARIO) */}
<section className="contacto">

  <h2>Contáctanos</h2>
  <p>¿Tienes dudas? Envíanos un mensaje y te responderemos lo más rápido posible.</p>

  <form
    className="form-contacto"
    onSubmit={async (e) => {
      e.preventDefault();

      const formData = {
        nombre: e.target.nombre.value,
        email: e.target.email.value,
        mensaje: e.target.mensaje.value,
      };

      try {
        const res = await fetch("https://natary-production.up.railway.app/api/contacto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
          alert("Mensaje enviado correctamente");
          e.target.reset();
        } else {
          alert(data.message || "Error al enviar mensaje");
        }
      } catch (error) {
        console.error(error);
        alert("Error en el servidor");
      }
    }}
  >

    <input
      type="text"
      name="nombre"
      placeholder="Tu nombre"
      required
    />

    <input
      type="email"
      name="email"
      placeholder="Tu correo"
      required
    />

    <textarea
      name="mensaje"
      placeholder="Escribe tu mensaje..."
      required
    />

    <button type="submit">
      Enviar mensaje
    </button>

  </form>

</section>
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
    <p>📍 México</p>
    <p>
  <a href="mailto:contacto@natary.com">contacto@natary.com</a>
</p>

<p>
  📞<a href="tel:5512345678">55-1234-5678</a>
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

export default Index;