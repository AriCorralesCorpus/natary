import { Navigate } from "react-router-dom";


function RutaProtegida({ children, rolPermitido }) {


    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );



    if (!usuario) {

        return <Navigate to="/login" replace />;

    }



    const rolUsuario = Number(
        usuario.tipo || usuario.rol || usuario.tipo_usu
    );



    if (rolUsuario !== Number(rolPermitido)) {

        return <Navigate to="/catalogo" replace />;

    }



    return children;


}


export default RutaProtegida;