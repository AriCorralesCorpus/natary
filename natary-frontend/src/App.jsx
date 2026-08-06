import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import MisCompras from "./pages/MisCompras";
import Privacidad from "./pages/Privacidad";
import Terminos from "./pages/Terminos";

import EditorProductos from "./pages/editor/EditorProductos";
import NuevoProducto from "./pages/editor/NuevoProducto";
import EditarProducto from "./pages/editor/EditarProducto";

import RutaProtegida from "./components/RutaProtegida";

import AdminDashboard from "./pages/Admin";

function App(){
return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Index />} />
<Route path="/catalogo" element={<Catalogo />} />

<Route path="/login" element={<Login />} />
<Route path="/registro" element={<Registro />} />

<Route path="/privacidad" element={<Privacidad />} />
<Route path="/terminos" element={<Terminos />} />
<Route
    path="/carrito"
    element={
        <RutaProtegida rolPermitido={2}>
            <Carrito />
        </RutaProtegida>
    }
/>

<Route
    path="/mis-compras"
    element={
        <RutaProtegida rolPermitido={2}>
            <MisCompras />
        </RutaProtegida>
    }
/>
<Route
    path="/admin"
    element={
        <RutaProtegida rolPermitido={1}>
            <AdminDashboard />
        </RutaProtegida>
    }
/>

<Route
    path="/editor/productos"
    element={
        <RutaProtegida rolPermitido={3}>
            <EditorProductos />
        </RutaProtegida>
    }
/>


<Route
    path="/editor/productos/nuevo"
    element={
        <RutaProtegida rolPermitido={3}>
            <NuevoProducto />
        </RutaProtegida>
    }
/>


<Route
    path="/editor/productos/editar"
    element={
        <RutaProtegida rolPermitido={3}>
            <EditarProducto />
        </RutaProtegida>
    }
/>

</Routes>

</BrowserRouter>

)
}

export default App;