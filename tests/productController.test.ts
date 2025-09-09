import { describe, it, expect, vi, beforeEach } from "vitest";
import * as productController from "../src/controllers/productController";
import * as productService from "../src/services/productService";

// Mock response helper
const mockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("Product Controller", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("getProducts should return list of products", async () => {
    const mockProducts = [
      { id: 1, name: "Test Product", price: 100 },
      { id: 2, name: "Another Product", price: 200 },
    ];
    vi.spyOn(productService, "getProducts").mockResolvedValue(mockProducts);

    const req: any = {};
    const res = mockResponse();

    await productController.getProducts(req, res);

    expect(productService.getProducts).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });

  it("createProduct should return 201 with new product", async () => {
    const mockProduct = { id: 1, name: "New Product", price: 150 };
    vi.spyOn(productService, "createProduct").mockResolvedValue(mockProduct);

    const req: any = { body: { name: "New Product", price: 150 } };
    const res = mockResponse();

    await productController.createProduct(req, res);

    expect(productService.createProduct).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  it("getProductById should return 404 if not found", async () => {
    vi.spyOn(productService, "getProductById").mockResolvedValue(null);

    const req: any = { params: { id: "99" } };
    const res = mockResponse();

    await productController.getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Product not found" });
  });

  it("deleteProduct should confirm deletion", async () => {
    vi.spyOn(productService, "deleteProduct").mockResolvedValue(undefined);

    const req: any = { params: { id: "1" } };
    const res = mockResponse();

    await productController.deleteProduct(req, res);

    expect(productService.deleteProduct).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({ message: "Product delete successfully" });
  });

  it("should return 400 on service error", async () => {
    vi.spyOn(productService, "createProduct").mockRejectedValue(new Error("DB error"));

    const req: any = { body: { name: "Fail Product", price: 50 } };
    const res = mockResponse();

    await productController.createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });
});
