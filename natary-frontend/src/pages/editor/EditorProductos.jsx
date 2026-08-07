import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function EditorProductos(){

    const [productos,setProductos] = useState([]);
    const [productoEliminar,setProductoEliminar] = useState(null);

    const navigate = useNavigate();

    const cerrarSesion = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("permisos");

    navigate("/login");

};

    const cargarProductos = async()=>{

        try{

            const res = await fetch(
                "https://natary-production.up.railway.app/api/productos"
            );


            const data = await res.json();


            setProductos(data);


        }catch(error){

            console.log(error);

        }

    };




    const eliminarProducto = async()=>{


        try{

const token = localStorage.getItem("token");

const respuesta = await fetch(
    `https://natary-production.up.railway.app/api/productos/${productoEliminar.cve_pro}`,
    {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);



            const data = await respuesta.json();



            if(data.success){


                alert("Producto eliminado correctamente");


                setProductoEliminar(null);


                cargarProductos();


            }



        }catch(error){

            console.log(error);

        }


    };





    useEffect(()=>{


        cargarProductos();


    },[]);





    return(


        <div className="container py-5">


          <div className="d-flex justify-content-between mb-4 align-items-center">


    <h2>
        Editor de Productos
    </h2>


    <div>


        <button

            className="btn btn-success me-2"

            onClick={()=>navigate("/editor/productos/nuevo")}

        >

            Nuevo producto

        </button>



        <button

            className="btn btn-danger"

            onClick={cerrarSesion}

        >

            Cerrar sesión

        </button>


    </div>


</div>






            <table className="table table-bordered shadow">


                <thead className="table-dark">


                    <tr>


                        <th>
                            Imagen
                        </th>


                        <th>
                            Nombre
                        </th>


                        <th>
                            Precio
                        </th>


                        <th>
                            Stock
                        </th>


                        <th>
                            Acciones
                        </th>


                    </tr>


                </thead>






                <tbody>


                {

                    productos.map((producto)=>(


                        <tr key={producto.cve_pro}>


                            <td>


                                <img

                                    src={`https://natary-production.up.railway.app/uploads/${producto.img_pro}`}

                                    width="80"

                                    alt={producto.nombre_pro}

                                />


                            </td>





                            <td>

                                {producto.nombre_pro}

                            </td>





                            <td>

                                ${producto.precio_pro}

                            </td>





                            <td>

                                {producto.stock_pro}

                            </td>





                            <td>



                                <button

                                    className="btn btn-warning me-2"


                                    onClick={()=>navigate(

                                        "/editor/productos/editar",

                                        {

                                            state:producto

                                        }

                                    )}

                                >

                                    Editar

                                </button>







                                <button

                                    className="btn btn-danger"


                                    onClick={()=>setProductoEliminar(producto)}

                                >

                                    Eliminar

                                </button>



                            </td>




                        </tr>



                    ))


                }



                </tbody>



            </table>









            {
                productoEliminar && (


                    <div

                        className="modal d-block"

                        tabIndex="-1"

                        style={{

                            background:"rgba(0,0,0,0.5)"

                        }}

                    >



                        <div className="modal-dialog">


                            <div className="modal-content">





                                <div className="modal-header">


                                    <h5 className="modal-title">

                                        Confirmar eliminación

                                    </h5>



                                    <button

                                        className="btn-close"

                                        onClick={()=>setProductoEliminar(null)}

                                    >

                                    </button>



                                </div>







                                <div className="modal-body">


                                    <p>

                                        ¿Seguro que deseas eliminar el producto:

                                        <strong>

                                            {" "}

                                            {productoEliminar.nombre_pro}

                                        </strong>

                                        ?

                                    </p>





                                    <img

                                        src={`https://natary-production.up.railway.app/uploads/${productoEliminar.img_pro}`}

                                        width="120"

                                        alt={productoEliminar.nombre_pro}

                                    />



                                </div>








                                <div className="modal-footer">



                                    <button

                                        className="btn btn-secondary"

                                        onClick={()=>setProductoEliminar(null)}

                                    >

                                        Cancelar

                                    </button>






                                    <button

                                        className="btn btn-danger"

                                        onClick={eliminarProducto}

                                    >

                                        Eliminar

                                    </button>




                                </div>





                            </div>


                        </div>


                    </div>


                )
            }






        </div>


    );


}



export default EditorProductos;