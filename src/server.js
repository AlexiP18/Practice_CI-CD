const app = require("./app");
const logger = require("./config/logger");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  logger.info(`🚀 Servidor iniciado en puerto ${port}`);
  logger.info(`📝 Entorno: ${process.env.NODE_ENV || "development"}`);
  logger.info(`🔗 Health check: http://localhost:${port}/health`);
});

// Manejo de errores del servidor
server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
  case "EACCES":
    logger.error(`Puerto ${port} requiere privilegios elevados`);
    process.exit(1);
    break;
  case "EADDRINUSE":
    logger.error(`Puerto ${port} ya está en uso`);
    process.exit(1);
    break;
  default:
    throw error;
  }
});

// Manejo de señales de terminación
process.on("SIGTERM", () => {
  logger.info("SIGTERM recibido. Cerrando servidor gracefully...");
  server.close(() => {
    logger.info("Servidor cerrado");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  logger.info("SIGINT recibido. Cerrando servidor gracefully...");
  server.close(() => {
    logger.info("Servidor cerrado");
    process.exit(0);
  });
});

module.exports = server;
