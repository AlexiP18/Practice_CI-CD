const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
  logger.error("Error occurred:", {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });

  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === "production" 
    ? "Internal Server Error" 
    : err.message;

  res.status(statusCode).json({
    ok: false,
    error: message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  });
};

module.exports = errorHandler;
