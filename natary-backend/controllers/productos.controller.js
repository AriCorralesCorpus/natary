const conexion = require("../db");
const path = require("path");

//GET productos
const getProductos = (req, res) => {
  const sql = "SELECT * FROM producto";

  conexion.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

//AGREGAR PRODUCTO
const agregarProducto = (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;

  if (!req.files || !req.files.imagen) {
    return res.status(400).json({ message: "Imagen requerida" });
  }

  const imagen = req.files.imagen;
  const nombreImagen = Date.now() + "_" + imagen.name;

  const uploadPath = path.join(__dirname, "../uploads/", nombreImagen);

  imagen.mv(uploadPath, (err) => {
    if (err) return res.status(500).json(err);

    const sql = `
      INSERT INTO producto 
      (nombre_pro, des_pro, precio_pro, stock_pro, img_pro)
      VALUES (?, ?, ?, ?, ?)
    `;

    conexion.query(
      sql,
      [nombre, descripcion, precio, stock, nombreImagen],
      (err) => {
        if (err) return res.status(500).json(err);

        res.json({ success: true });
      }
    );
  });
};

//ACTUALIZAR STOCK
const actualizarStock = (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  const sql = `
    UPDATE producto 
    SET stock_pro = ?
    WHERE cve_pro = ?
  `;

  conexion.query(sql, [stock, id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ success: true, message: "Stock actualizado" });
  });
};

//ELIMINAR
const eliminarProducto = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM producto WHERE cve_pro = ?";

  conexion.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ success: true, message: "Producto eliminado" });
  });
};

// EDITAR PRODUCTO
const editarProducto = (req,res)=>{

  const {id} = req.params;

  const {
    nombre,
    descripcion,
    precio,
    stock
  } = req.body;


  const sql = `
    UPDATE producto
    SET 
    nombre_pro=?,
    des_pro=?,
    precio_pro=?,
    stock_pro=?
    WHERE cve_pro=?
  `;


  conexion.query(
    sql,
    [
      nombre,
      descripcion,
      precio,
      stock,
      id
    ],
    (err)=>{

      if(err)
        return res.status(500).json(err);


      res.json({
        success:true,
        message:"Producto actualizado"
      });

    }
  );

};

module.exports = {
  getProductos,
  agregarProducto,
  actualizarStock,
  eliminarProducto,
  editarProducto
};