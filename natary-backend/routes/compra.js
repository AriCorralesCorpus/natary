const express = require("express");
const router = express.Router();
const db = require("../db");
const verificarToken = require("../middleware/auth");

router.post("/", verificarToken, (req, res) => {

    const usuario = req.user.nombre;

    // 1. buscar carrito
    const buscarCarrito = `
        SELECT id_carrito
        FROM carrito
        WHERE nom_usu = ?
    `;

    db.query(buscarCarrito, [usuario], (err, data) => {

        if (err) return res.status(500).json(err);

        if (!data.length) {
            return res.json({ success: false, msg: "No existe carrito" });
        }

        const idCarrito = data[0].id_carrito;

        // 2. productos del carrito
        const productos = `
            SELECT 
                cd.cve_pro,
                cd.cantidad,
                p.precio_pro
            FROM carrito_detalle cd
            INNER JOIN producto p ON p.cve_pro = cd.cve_pro
            WHERE cd.id_carrito = ?
        `;

        db.query(productos, [idCarrito], (err, items) => {

            if (err) return res.status(500).json(err);

            if (!items.length) {
                return res.json({ success: false, msg: "Carrito vacío" });
            }

            let total = 0;
            let totalCantidad = 0;

            items.forEach(p => {
                total += p.precio_pro * p.cantidad;
                totalCantidad += p.cantidad;
            });

            // 3. crear compra
            const venta = `
                INSERT INTO compra
                (fecha, aprobado_com, cantsol_com, id_usuario, folio_compra)
                VALUES (NOW(), 1, ?, ?, ?)
            `;

            db.query(venta,
                [
                    totalCantidad,
                    usuario,
                    "FOLIO-" + Date.now()
                ],
                (err, result) => {

                    if (err) return res.status(500).json(err);

                    const idCompra = result.insertId;

                    // 4. guardar detalle (AQUÍ ESTABA TU ERROR)
                    items.forEach(p => {

                        const detalle = `
                            INSERT INTO compra_detalle
                            (cve_com, cve_pro, cantidad, precio)
                            VALUES (?, ?, ?, ?)
                        `;

                        db.query(detalle, [
                            idCompra,
                            p.cve_pro,
                            p.cantidad,
                            p.precio_pro
                        ]);

                        // 5. actualizar stock
                        const stock = `
                            UPDATE producto
                            SET stock_pro = stock_pro - ?
                            WHERE cve_pro = ?
                        `;

                        db.query(stock, [
                            p.cantidad,
                            p.cve_pro
                        ]);
                    });

                    // 6. limpiar carrito
                    const limpiar = `
                        DELETE FROM carrito_detalle
                        WHERE id_carrito = ?
                    `;

                    db.query(limpiar, [idCarrito]);

                    return res.json({
                        success: true,
                        total
                    });
                }
            );
        });
    });
});

module.exports = router;