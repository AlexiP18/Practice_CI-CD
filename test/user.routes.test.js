const request = require("supertest");
const app = require("../src/app");

describe("User Routes", () => {
  describe("GET /api/users", () => {
    it("debe listar todos los usuarios", async () => {
      const res = await request(app).get("/api/users");
      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.users).toBeDefined();
      expect(Array.isArray(res.body.users)).toBe(true);
    });
  });

  describe("GET /api/users/:id", () => {
    it("debe obtener un usuario por ID", async () => {
      const res = await request(app).get("/api/users/1");
      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.id).toBe(1);
    });

    it("debe retornar 404 para usuario inexistente", async () => {
      const res = await request(app).get("/api/users/999");
      expect(res.statusCode).toBe(404);
      expect(res.body.ok).toBe(false);
    });
  });

  describe("POST /api/users", () => {
    it("debe crear un nuevo usuario", async () => {
      const newUser = {
        name: "Test User",
        email: "test@example.com"
      };
      
      const res = await request(app)
        .post("/api/users")
        .send(newUser);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.ok).toBe(true);
      expect(res.body.user.name).toBe(newUser.name);
      expect(res.body.user.email).toBe(newUser.email);
    });

    it("debe retornar error si faltan datos", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({ name: "Solo nombre" });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.ok).toBe(false);
    });
  });

  describe("PUT /api/users/:id", () => {
    it("debe actualizar un usuario existente", async () => {
      const res = await request(app)
        .put("/api/users/1")
        .send({ name: "Usuario Actualizado" });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.user.name).toBe("Usuario Actualizado");
    });

    it("debe retornar 404 al actualizar usuario inexistente", async () => {
      const res = await request(app)
        .put("/api/users/999")
        .send({ name: "Test" });
      
      expect(res.statusCode).toBe(404);
      expect(res.body.ok).toBe(false);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("debe eliminar un usuario existente", async () => {
      const res = await request(app).delete("/api/users/2");
      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
    });

    it("debe retornar 404 al eliminar usuario inexistente", async () => {
      const res = await request(app).delete("/api/users/999");
      expect(res.statusCode).toBe(404);
      expect(res.body.ok).toBe(false);
    });
  });
});
