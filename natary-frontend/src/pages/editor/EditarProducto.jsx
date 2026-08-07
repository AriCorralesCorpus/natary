import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";


function EditarProducto(){

    const {state: producto} = useLocation();

    const navigate = useNavigate();


    const [nombre,setNombre] = useState(producto?.nombre_pro || "");
    const [descripcion,setDescripcion] = useState(producto?.des_pro || "");
    const [precio,setPrecio] = useState(producto?.precio_pro || "");
    const [stock,setStock] = useState(producto?.stock_pro || "");



    const actualizar = async(e)=>{

        e.preventDefault();


        try{
const token = localStorage.getItem("token");
           const respuesta = await fetch(
    `https://natary-production.up.railway.app/api/productos/${producto.cve_pro}`,
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            nombre,
            descripcion,
            precio,
            stock
        })
    }
);


            const data = await respuesta.json();


            if(data.success){

                alert("Producto actualizado correctamente");

                navigate("/editor/productos");

            }


        }catch(error){

            console.log(error);

        }


    };



    return(

        <div className="container py-5">

            <h2>
                Editar Producto
            </h2>


            <form onSubmit={actualizar}>


                <div className="mb-3">

                    <label>
                        Nombre
                    </label>

                    <input
                        className="form-control"
                        value={nombre}
                        onChange={(e)=>setNombre(e.target.value)}
                    />

                </div>



                <div className="mb-3">

                    <label>
                        Descripción
                    </label>

                    <textarea
                        className="form-control"
                        value={descripcion}
                        onChange={(e)=>setDescripcion(e.target.value)}
                    />

                </div>




                <div className="mb-3">

                    <label>
                        Precio
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={precio}
                        onChange={(e)=>setPrecio(e.target.value)}
                    />

                </div>




                <div className="mb-3">

                    <label>
                        Stock
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={stock}
                        onChange={(e)=>setStock(e.target.value)}
                    />

                </div>




                <button className="btn btn-warning">

                    Guardar cambios

                </button>

                <button

    type="button"

    className="btn btn-secondary me-2"

    onClick={()=>navigate("/editor/productos")}

>

    ← Regresar

</button>


            </form>


        </div>

    );

}


export default EditarProducto;