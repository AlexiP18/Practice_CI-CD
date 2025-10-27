const express = require("express");
const router = express.Router();
const logger = require("../config/logger");

// GET /api/hello
router.get("/", (req, res) => {
  logger.info("Hello endpoint accessed");
  res.json({ 
    ok: true, 
    message: "¡Hola DevOps!" 
  });
});

// GET /api/hello/:name
router.get("/:name", (req, res) => {
  const { name } = req.params;
  logger.info(`Hello endpoint accessed with name: ${name}`);
  res.json({ 
    ok: true, 
    message: `¡Hola ${name}!` 
  });
});

module.exports = router;
