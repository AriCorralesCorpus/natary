import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../assets/fondo.avif";

function Registro(){

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");
const [password, setPassword] = useState("");

const [nombre, setNombre] = useState("");
const [apellidoP, setApellidoP] = useState("");
const [apellidoM, setApellidoM] = useState("");
const [telefono, setTelefono] = useState("");
const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    const registrar = async(e)=>{
        e.preventDefault();

        try{

            const res = await fetch("https://natary-production.up.railway.app/api/registro",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
    usuario,
    password,
    nombre,
    apellidoP,
    apellidoM,
    telefono,
    correo
})
            });


            const data = await res.json();


            if(!res.ok){
                setMensaje(data.message);
                return;
            }


            setMensaje("Usuario registrado correctamente");


            setTimeout(()=>{
                navigate("/login");
            },1500);


        }catch(error){

            setMensaje("Error del servidor");

        }

    };


    return(
        <div className="login-page">


            <button
            className="btn-back"
            onClick={()=>navigate("/")}
            >
                Regresar
            </button>


            <div className="login-box">

                <h2>REGISTRO</h2>


                {mensaje &&
                <p>{mensaje}</p>
                }


                <form onSubmit={registrar}>

<input
type="text"
placeholder="Nombre"
value={nombre}
onChange={(e)=>setNombre(e.target.value)}
/>

<input
type="text"
placeholder="Apellido paterno"
value={apellidoP}
onChange={(e)=>setApellidoP(e.target.value)}
/>

<input
type="text"
placeholder="Apellido materno"
value={apellidoM}
onChange={(e)=>setApellidoM(e.target.value)}
/>

<input
type="text"
placeholder="Teléfono"
value={telefono}
onChange={(e)=>setTelefono(e.target.value)}
/>

<input
type="email"
placeholder="Correo"
value={correo}
onChange={(e)=>setCorreo(e.target.value)}
/>
                    <input
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e)=>setUsuario(e.target.value)}
                    />


                    <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />


                    <button type="submit">
                        Registrarse
                    </button>


                </form>

            </div>

        </div>
    );

}


export default Registro;