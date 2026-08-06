function EliminarProducto() {

    const permisos = JSON.parse(localStorage.getItem("permisos")) || [];

    if (!permisos.includes("ELIMINAR_PRODUCTO")) {

        return (

            <div className="container mt-5">

                <h2>Acceso denegado</h2>

                <p>No tienes permiso para eliminar productos.</p>

            </div>

        );

    }

    return (

        <div className="container mt-5">

            <h2>Eliminar Producto</h2>

            <div className="alert alert-warning">

                ¿Deseas eliminar el producto
                <strong> Amigurumi Stitch </strong>?

            </div>

            <button className="btn btn-danger">

                Eliminar

            </button>

        </div>

    );

}

export default EliminarProducto;