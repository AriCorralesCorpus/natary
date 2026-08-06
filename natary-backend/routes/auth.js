const express = require("express");
const router = express.Router();
const db = require("../db");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// LOGIN
router.post("/login", (req, res) => {

    const { usuario, password } = req.body;

    const sql = "SELECT * FROM usuario WHERE nom_usu = ?";

    db.query(sql, [usuario], async (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Error del servidor"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos"
            });
        }

        const user = results[0];

        // Comparar contraseña
        const coincide = await bcrypt.compare(password, user.pass_usu);

        if (!coincide) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos"
            });
        }

        // Crear Token
       

        const sqlPermisos = `
SELECT p.nombre_permiso
FROM usuario_rol ur
INNER JOIN rol_permiso rp
    ON ur.id_rol = rp.id_rol
INNER JOIN permisos p
    ON rp.id_permiso = p.id_permiso
WHERE ur.nom_usu = ?
`;

db.query(sqlPermisos, [user.nom_usu], (errPermisos, permisos) => {

    if (errPermisos) {
        return res.status(500).json({
            message: "Error obteniendo permisos"
        });
    }

    const listaPermisos = permisos.map(p => p.nombre_permiso);

// Crear el token incluyendo permisos
const token = jwt.sign(
    {
        nombre: user.nom_usu,
        tipo: user.tipo_usu,
        permisos: listaPermisos
    },
    "CLAVE_SECRETA",
    {
        expiresIn: "2h"
    }
);

return res.json({
    message: "Login exitoso",
    token,
    usuario: {
        nombre: user.nom_usu,
        tipo: user.tipo_usu
    },
    permisos: listaPermisos
});

});

    });

});

// REGISTRO DE USUARIOS
router.post("/registro", async (req, res) => {

    console.log("BODY REGISTRO:", req.body);

    const { 
    usuario,
    password,
    nombre,
    apellidoP,
    apellidoM,
    telefono,
    correo
} = req.body;

    if (!usuario || !password) {
        return res.status(400).json({
            message: "Todos los campos son obligatorios"
        });
    }

    try {

        // Verificar si el usuario ya existe
        const verificar = "SELECT * FROM usuario WHERE nom_usu = ?";

        db.query(verificar, [usuario], async (err, resultados) => {

            if (err) {
                return res.status(500).json({
                    message: "Error del servidor"
                });
            }

            if (resultados.length > 0) {
                return res.status(400).json({
                    message: "El usuario ya existe"
                });
            }

            // Hash de la contraseña
            const passwordHash = await bcrypt.hash(password, 10);

            // Insertar usuario
            const insertar = `
                INSERT INTO usuario
                (nom_usu, pass_usu, tipo_usu)
                VALUES (?, ?, ?)
            `;

          db.query(insertar,
[usuario, passwordHash, 2],
(err2)=>{

    if(err2){

    console.log("ERROR USUARIO:", err2);

    return res.status(500).json({
        message:"No se pudo registrar usuario"
    });
}


    const cve_cli = "CLI" + Math.floor(Math.random()*10000);


    const insertarCliente = `
    INSERT INTO cliente
    (
    cve_cli,
    nompila_cli,
    app_cli,
    apm_cli,
    tel_cli,
    correo_cli,
    nom_usu
    )
    VALUES (?,?,?,?,?,?,?)
    `;

db.query(
    insertarCliente,
    [
        cve_cli,
        nombre,
        apellidoP,
        apellidoM,
        telefono,
        correo,
        usuario
    ],
    (err3)=>{

        if(err3){

            console.log("ERROR CLIENTE:", err3);

            return res.status(500).json({
                message:"Usuario creado pero error en cliente"
            });
        }


        const asignarRol = `
        INSERT INTO usuario_rol
        (nom_usu,id_rol)
        VALUES (?,?)
        `;


        db.query(
            asignarRol,
            [usuario,2],
            (err4)=>{

                if(err4){

                    console.log("ERROR ROL:",err4);

                    return res.status(500).json({
                        message:"Error asignando rol"
                    });

                }


                return res.status(201).json({
                    message:"Usuario registrado correctamente"
                });

            }
        );


    }
);


});

        });

    } catch (error) {

    console.log("ERROR REGISTRO:", error);

    return res.status(500).json({
        message:"Error interno",
        error:error.message
    });

}

});

module.exports = router;