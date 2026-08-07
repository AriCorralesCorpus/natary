import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  const cargarProductos = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://natary-production.up.railway.app/api/productos", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  // AGREGAR
  const agregarProducto = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const token = localStorage.getItem("token");
    const res = await fetch("https://natary-production.up.railway.app/api/productos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();

    if (res.ok) {
      alert("Producto agregado");
      e.target.reset();
      cargarProductos();
    } else {
      alert(data.message || "Error al agregar");
    }
  };

  // STOCK
  const actualizarStock = async (id, stock) => {
    const token = localStorage.getItem("token");
    await fetch(`https://natary-production.up.railway.app/api/productos/stock/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json" ,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ stock })
    });

    cargarProductos();
  };

  // ELIMINAR
  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
const token = localStorage.getItem("token");
    await fetch(`https://natary-production.up.railway.app/api/productos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    cargarProductos();
  };

  return (
    <div className="admin-page">

      {/* HEADER */}
      <header className="admin-header">
        <h1>Panel de Administrador</h1>

        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </header>

      {/* FORMULARIO */}
      <section className="admin-form">
        <h2>Agregar producto</h2>

        <form onSubmit={agregarProducto} encType="multipart/form-data">
          <input name="nombre" placeholder="Nombre" required />
          <input name="descripcion" placeholder="Descripción" />
          <input name="precio" type="number" placeholder="Precio" required />
          <input name="stock" type="number" placeholder="Stock" required />
          <input name="imagen" type="file" required />

          <button type="submit">Guardar producto</button>
        </form>
      </section>

      {/* LISTA */}
      <section className="admin-grid">
        {productos.map((p) => (
          <div className="card-producto" key={p.cve_pro}>

            <img
              src={`https://natary-production.up.railway.app/uploads/${p.img_pro}`}
              alt={p.nombre_pro}
            />

            <div className="info">
              <h3>{p.nombre_pro}</h3>
              <p>${p.precio_pro}</p>

              <label>Stock</label>
              <input
                type="number"
                defaultValue={p.stock_pro}
                onBlur={(e) =>
                  actualizarStock(p.cve_pro, e.target.value)
                }
              />

              <button
                className="btn-delete"
                onClick={() => eliminar(p.cve_pro)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}

export default Admin;