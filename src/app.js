const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
  res.json({ ok: true, message: "Hola DevOps!" });
});

module.exports = app;
