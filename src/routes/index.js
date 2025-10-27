const express = require("express");
const router = express.Router();

// Importar rutas específicas
const helloRoutes = require("./hello.routes");
const userRoutes = require("./user.routes");

// Usar rutas
router.use("/hello", helloRoutes);
router.use("/users", userRoutes);

module.exports = router;
