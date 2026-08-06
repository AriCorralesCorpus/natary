import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const iniciarSesion = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ usuario, password })
    });

    const data = await res.json();
    console.log(data);

if (!res.ok) {
  setError(data.message);
  return;
}

//guardar token (NO usuario solo)
localStorage.setItem("token", data.token);
localStorage.setItem("usuario", JSON.stringify(data.usuario));
localStorage.setItem(
    "permisos",
    JSON.stringify(data.permisos)
);

// redirección
if (data.usuario.tipo === 1) {

  navigate("/admin");

} else if (data.usuario.tipo === 3) {

  navigate("/editor/productos");

} else {

  navigate("/catalogo");
}

  } catch (err) {
    setError("Error en el servidor");
  }
};


return (
  <div className="login-page">

     {/* BOTÓN REGRESAR */}
    <button
      className="btn-back"
      onClick={() => navigate("/")}
    >
      Regresar
    </button>

    <div className="login-box">

      <h2>INICIAR SESIÓN</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={iniciarSesion}>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Iniciar sesión
        </button>

        <button
          type="button"
          onClick={() => navigate("/registro")}
        >
          Registrarse
        </button>

      </form>

    </div>
  </div>
);
}

export default Login;