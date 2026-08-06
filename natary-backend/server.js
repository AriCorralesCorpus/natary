const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const productosRoutes = require("./routes/productos.routes");
const carritoRoutes = require("./routes/carrito");
const compraRoutes = require("./routes/compra");
const authRoutes = require("./routes/auth");
const misCompras = require("./routes/misCompras");
const contactoRoutes = require("./routes/contacto");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use((req,res,next)=>{
    console.log("PETICION:", req.method, req.url);
    next();
});
app.use(fileUpload());

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.use("/api/productos", productosRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/compra", compraRoutes);
app.use("/api", authRoutes);
app.use("/api/mis-compras", misCompras);
app.use("/api/contacto", contactoRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (req,res)=>{
    res.json({
        mensaje:"API NATARY funcionando"
    });
});

app.post("/api/contacto", (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ message: "Campos incompletos" });
  }

  console.log("Nuevo mensaje:", req.body);

  res.json({ message: "Mensaje recibido correctamente" });
});
console.log("SERVER NATARY ACTUAL");
app.listen(4000, ()=>{
    console.log("Servidor Express en puerto 4000");
});