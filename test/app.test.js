const request = require("supertest");
const app = require("../src/index");

describe("GET /hello", () => {
  it("debe responder con ok true", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
