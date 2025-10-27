require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes");

const app = express();

// Seguridad con configuración para permitir inline scripts de la UI
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
}));

// CORS
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(",") 
    : "*",
  credentials: true
};
app.use(cors(corsOptions));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (UI gráfica)
app.use(express.static(path.join(__dirname, "../public")));

// Request logging
if (process.env.NODE_ENV !== "test") {
  app.use(requestLogger);
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    ok: true, 
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use("/api", routes);

// API info endpoint (JSON)
app.get("/api-info", (req, res) => {
  res.json({ 
    ok: true, 
    message: "Mi App CI/CD - API funcionando correctamente",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      api: "/api",
      ui: "/"
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    ok: false, 
    error: "Endpoint no encontrado" 
  });
});

// Error handler (debe ir al final)
app.use(errorHandler);

module.exports = app;
