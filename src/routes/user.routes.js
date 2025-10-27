const express = require("express");
const router = express.Router();
const logger = require("../config/logger");

// Simulación de base de datos en memoria
let users = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com" },
  { id: 2, name: "María García", email: "maria@example.com" }
];

// GET /api/users - Listar todos los usuarios
router.get("/", (req, res) => {
  logger.info("Getting all users");
  res.json({ 
    ok: true, 
    count: users.length,
    users 
  });
});

// GET /api/users/:id - Obtener un usuario específico
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ 
      ok: false, 
      error: "Usuario no encontrado" 
    });
  }
  
  logger.info(`Getting user with id: ${id}`);
  res.json({ ok: true, user });
});

// POST /api/users - Crear un nuevo usuario
router.post("/", (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ 
      ok: false, 
      error: "Nombre y email son requeridos" 
    });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  logger.info(`User created: ${newUser.id}`);
  
  res.status(201).json({ 
    ok: true, 
    message: "Usuario creado exitosamente",
    user: newUser 
  });
});

// PUT /api/users/:id - Actualizar un usuario
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ 
      ok: false, 
      error: "Usuario no encontrado" 
    });
  }
  
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;
  
  logger.info(`User updated: ${id}`);
  
  res.json({ 
    ok: true, 
    message: "Usuario actualizado exitosamente",
    user: users[userIndex] 
  });
});

// DELETE /api/users/:id - Eliminar un usuario
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ 
      ok: false, 
      error: "Usuario no encontrado" 
    });
  }
  
  users.splice(userIndex, 1);
  logger.info(`User deleted: ${id}`);
  
  res.json({ 
    ok: true, 
    message: "Usuario eliminado exitosamente" 
  });
});

module.exports = router;
