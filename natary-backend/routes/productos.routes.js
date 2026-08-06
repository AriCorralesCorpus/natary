const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/auth");
const verificarPermiso = require("../middleware/permisos");

const {
    getProductos,
    agregarProducto,
    actualizarStock,
    editarProducto,
    eliminarProducto
} = require("../controllers/productos.controller");

// Público
router.get("/", getProductos);

// Editor o Admin
router.post(
    "/",
    verificarToken,
    verificarPermiso("CREAR_PRODUCTO"),
    agregarProducto
);

router.put(
    "/:id",
    verificarToken,
    verificarPermiso("EDITAR_PRODUCTO"),
    editarProducto
);

router.put(
    "/stock/:id",
    verificarToken,
    verificarPermiso("EDITAR_PRODUCTO"),
    actualizarStock
);

router.delete(
    "/:id",
    verificarToken,
    verificarPermiso("ELIMINAR_PRODUCTO"),
    eliminarProducto
);

module.exports = router;