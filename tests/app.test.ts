import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";

// ✅ Mock authMiddleware to always allow
vi.mock("../src/middleware/authMiddleware", () => {
  return {
    authenticate: (req: any, res: any, next: any) => {
      req.user = { id: 1, email: "test@example.com" }; // fake user
      next();
    },
  };
});

// ✅ Mock productController
vi.mock("../src/controllers/productController", () => {
  return {
    createProduct: vi.fn((_req: any, res: any) =>
      res.status(201).json({ id: 1, name: "New Product" })
    ),
    getProducts: vi.fn((_req: any, res: any) =>
      res.json([{ id: 1, name: "Test Product" }])
    ),
    getProductById: vi.fn((_req: any, res: any) =>
      res.json({ id: 1, name: "Test Product" })
    ),
    updateProduct: vi.fn((_req: any, res: any) =>
      res.json({ id: 1, name: "Updated Product" })
    ),
    deleteProduct: vi.fn((_req: any, res: any) =>
      res.status(204).send()
    ),
  };
});

import app from "../src/app";

describe("Product Routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("GET /api/products should return a list", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: "Test Product" }]);
  });

  it("POST /api/products should create a product", async () => {
    const res = await request(app).post("/api/products").send({ name: "New Product" });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 1, name: "New Product" });
  });

  it("GET /api/products/:id should return one product", async () => {
    const res = await request(app).get("/api/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, name: "Test Product" });
  });

  it("PUT /api/products/:id should update a product", async () => {
    const res = await request(app).put("/api/products/1").send({ name: "Updated Product" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, name: "Updated Product" });
  });

  it("DELETE /api/products/:id should delete a product", async () => {
    const res = await request(app).delete("/api/products/1");
    expect(res.status).toBe(204);
  });
});
