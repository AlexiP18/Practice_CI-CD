const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
  res.json({ ok: true, message: "Hola DevOps!" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App escuchando en puerto ${port}`));

module.exports = app; // export para pruebas
