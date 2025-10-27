const request = require("supertest");
const app = require("../src/app");

describe("App Integration Tests", () => {
  it("debe cargar la aplicación correctamente", () => {
    expect(app).toBeDefined();
  });

  it("debe responder a peticiones HTTP", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });
});

