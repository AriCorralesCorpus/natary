const express = require("express");
const router = express.Router();
const db = require("../db");
const verificarToken = require("../middleware/auth");

//OBTENER TODAS LAS COMPRAS CON DETALLE
router.get("/", verificarToken, (req, res) => {

    const usuario = req.user.nombre;

    const sql = `
        SELECT 
            c.cve_com,
            c.fecha,
            c.folio_compra,
            c.cantsol_com,
            cd.cve_pro,
            cd.cantidad AS cantsol_com,
            cd.precio AS precio_pro,
            p.nombre_pro,
            p.img_pro
        FROM compra c
        INNER JOIN compra_detalle cd ON c.cve_com = cd.cve_com
        INNER JOIN producto p ON p.cve_pro = cd.cve_pro
        WHERE c.id_usuario = ?
        ORDER BY c.cve_com DESC
    `;

    db.query(sql, [usuario], (err, data) => {

        if (err) return res.status(500).json(err);

        res.json(data);
    });
});

module.exports = router;