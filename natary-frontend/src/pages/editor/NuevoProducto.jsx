import { useState } from "react";
import { useNavigate } from "react-router-dom";


function NuevoProducto(){

    const navigate = useNavigate();


    const [nombre,setNombre] = useState("");
    const [precio,setPrecio] = useState("");
    const [stock,setStock] = useState("");
    const [imagen,setImagen] = useState(null);



    const guardarProducto = async(e)=>{

        e.preventDefault();


        const formulario = new FormData();


        formulario.append("nombre", nombre);
        formulario.append("descripcion", "Producto NATARY");
        formulario.append("precio", precio);
        formulario.append("stock", stock);
        formulario.append("imagen", imagen);



        try{

const token = localStorage.getItem("token");
           const respuesta = await fetch(
    "https://natary-production.up.railway.app/api/productos",
    {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formulario
    }
);



            const data = await respuesta.json();



            if(data.success){


                alert("Producto agregado correctamente");


                navigate("/editor/productos");


            }else{

                alert(data.message);

            }



        }catch(error){

            console.log(error);

        }


    };





    return(


        <div className="container py-5">


            <h2 className="mb-4">
                Nuevo Producto
            </h2>




            <form onSubmit={guardarProducto}>



                <div className="mb-3">


                    <label className="form-label">

                        Imagen del producto

                    </label>



                    <input

                        type="file"

                        className="form-control"

                        accept="image/*"

                        onChange={(e)=>setImagen(e.target.files[0])}

                        required

                    />


                </div>






                <div className="mb-3">


                    <label className="form-label">

                        Nombre

                    </label>



                    <input

                        type="text"

                        className="form-control"

                        value={nombre}

                        onChange={(e)=>setNombre(e.target.value)}

                        required

                    />


                </div>






                <div className="mb-3">


                    <label className="form-label">

                        Precio

                    </label>



                    <input

                        type="number"

                        className="form-control"

                        value={precio}

                        onChange={(e)=>setPrecio(e.target.value)}

                        required

                    />


                </div>







                <div className="mb-3">


                    <label className="form-label">

                        Stock

                    </label>



                    <input

                        type="number"

                        className="form-control"

                        value={stock}

                        onChange={(e)=>setStock(e.target.value)}

                        required

                    />


                </div>






                <button

                    className="btn btn-success me-2"

                    type="submit"

                >

                    Guardar producto

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


export default NuevoProducto;