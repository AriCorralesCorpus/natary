const express = require("express");
const router = express.Router();
const db = require("../db");

// GUARDAR MENSAJE
router.post("/", (req, res) => {

    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).json({
            success: false,
            message: "Faltan datos"
        });
    }

    const sql = `
        INSERT INTO contacto (nombre, email, mensaje)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [nombre, email, mensaje], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        return res.json({
            success: true,
            message: "Mensaje guardado correctamente"
        });
    });
});

module.exports = router;