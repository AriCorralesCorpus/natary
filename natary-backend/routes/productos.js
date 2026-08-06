const express = require("express");
const router = express.Router();

const db = require("../db");


// obtener productos
router.get("/", (req,res)=>{

    const sql = "SELECT * FROM producto";


    db.query(sql,(err,result)=>{

        if(err){

            return res.status(500).json({
                error:err
            });

        }


        res.json(result);

    });

});


module.exports = router;