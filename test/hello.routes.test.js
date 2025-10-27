const request = require("supertest");
const app = require("../src/app");

describe("Hello Routes", () => {
  describe("GET /api/hello", () => {
    it("debe responder con ok true y mensaje", async () => {
      const res = await request(app).get("/api/hello");
      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.message).toBe("¡Hola DevOps!");
    });
  });

  describe("GET /api/hello/:name", () => {
    it("debe responder con saludo personalizado", async () => {
      const res = await request(app).get("/api/hello/Alexis");
      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.message).toBe("¡Hola Alexis!");
    });
  });
});
