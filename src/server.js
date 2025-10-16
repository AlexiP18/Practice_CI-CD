const app = require("./app");

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App escuchando en puerto ${port}`);
});

module.exports = server; // útil para cerrar en escenarios no-test
