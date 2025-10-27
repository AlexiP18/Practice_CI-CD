const request = require("supertest");
const app = require("../src/app");

describe("Health & Root Endpoints", () => {
  describe("GET /health", () => {
    it("debe retornar estado saludable", async () => {
      const res = await request(app).get("/health");
      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.status).toBe("healthy");
      expect(res.body.timestamp).toBeDefined();
      expect(res.body.uptime).toBeDefined();
    });
  });

  describe("GET /", () => {
    it("debe retornar información de la API", async () => {
      const res = await request(app).get("/");
      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.message).toBeDefined();
      expect(res.body.endpoints).toBeDefined();
    });
  });

  describe("GET /nonexistent", () => {
    it("debe retornar 404 para rutas inexistentes", async () => {
      const res = await request(app).get("/nonexistent");
      expect(res.statusCode).toBe(404);
      expect(res.body.ok).toBe(false);
    });
  });
});
