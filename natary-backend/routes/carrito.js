const express = require("express");
const router = express.Router();
const verificarToken = require("../middleware/auth");
const db = require("../db");

// OBTENER CARRITO
router.get("/", verificarToken, (req,res)=>{

    const usuario = req.user.nombre;

    console.log("Usuario token:", usuario);

    const sql = `
    SELECT 
    p.cve_pro,
    p.nombre_pro,
    p.precio_pro,
    p.img_pro,
    p.stock_pro,
    cd.cantidad

    FROM carrito c

    INNER JOIN carrito_detalle cd
    ON c.id_carrito = cd.id_carrito

    INNER JOIN producto p
    ON p.cve_pro = cd.cve_pro

    WHERE c.nom_usu = ?
    `;

    db.query(sql,[usuario],(err,result)=>{

        console.log("Resultado SQL:", result);

        if(err){
            return res.status(500).json(err);
        }
        res.json(result);
    });
});

// AGREGAR / ACTUALIZAR CARRITO
router.put("/", verificarToken, (req, res) => {

    const usuario = req.user.nombre;
const { cve_pro, accion } = req.body;

    const buscar = `
    SELECT id_carrito
    FROM carrito
    WHERE nom_usu=?
    `;

    db.query(buscar,[usuario],(err,data)=>{

        if(err){
            return res.status(500).json(err);
        }

        let id;

        // si no existe carrito lo crea
        if(data.length === 0){

            const crear = `
            INSERT INTO carrito(nom_usu)
            VALUES(?)
            `;

            db.query(crear,[usuario],(error,result)=>{

                if(error){
                    return res.status(500).json(error);
                }
                id=result.insertId;
                manejarProducto(id);

            });
        }else{
            id=data[0].id_carrito;
            manejarProducto(id);
        }
        function manejarProducto(id){

            if(accion==="sumar"){

                const buscarProducto = `
                SELECT *
                FROM carrito_detalle
                WHERE id_carrito=?
                AND cve_pro=?
                `;

                db.query(buscarProducto,[id,cve_pro],(err,producto)=>{

                    if(producto.length > 0){

                        const actualizar = `
                        UPDATE carrito_detalle
                        SET cantidad=cantidad+1
                        WHERE id_carrito=?
                        AND cve_pro=?
                        `;

                        db.query(actualizar,[id,cve_pro]);

                    }else{

                        const insertar = `
                        INSERT INTO carrito_detalle
                        (id_carrito,cve_pro,cantidad)
                        VALUES(?,?,1)
                        `;

                        db.query(insertar,[id,cve_pro]);

                    }

                    res.json({
                        success:true
                    });
                });
            }

            if(accion==="restar"){

                const sql=`
                UPDATE carrito_detalle
                SET cantidad=cantidad-1
                WHERE id_carrito=?
                AND cve_pro=?
                AND cantidad>1
                `;

                db.query(sql,[id,cve_pro]);

                return res.json({
                    success:true
                });
            }

            if(accion==="eliminar"){

                const sql=`
                DELETE FROM carrito_detalle
                WHERE id_carrito=?
                AND cve_pro=?
                `;

                db.query(sql,[id,cve_pro]);

                return res.json({
                    success:true
                });
            }
        }
    });
});

module.exports = router;