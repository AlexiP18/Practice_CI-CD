const request = require("supertest");
const app = require("../src/app");

describe("Error Handler Tests", () => {
  it("debe manejar rutas no encontradas con 404", async () => {
    const res = await request(app).get("/ruta/inexistente/random");
    expect(res.statusCode).toBe(404);
    expect(res.body.ok).toBe(false);
  });

  it("debe retornar JSON para errores", async () => {
    const res = await request(app).get("/api/users/abc");
    expect(res.headers["content-type"]).toMatch(/json/);
  });
});

describe("CORS and Security", () => {
  it("debe incluir headers de seguridad (Helmet)", async () => {
    const res = await request(app).get("/health");
    expect(res.headers).toHaveProperty("x-content-type-options");
  });
});
