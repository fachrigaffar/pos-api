import { describe, it, expect, vi, beforeEach } from "vitest";
import * as productService from "../src/services/productService";
import prisma from "../src/config/prisma"; // adjust path if needed

// Mock prisma
vi.mock("../src/config/prisma", () => ({
  default: {
    product: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe("Product Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("createProduct should call prisma.product.create", async () => {
    const mockProduct = { id: 1, name: "New Product", price: 100 };
    (prisma.product.create as any).mockResolvedValue(mockProduct);

    const result = await productService.createProduct({
      name: "New Product",
      price: 100,
    });

    expect(prisma.product.create).toHaveBeenCalledWith({
      data: { name: "New Product", price: 100 },
    });
    expect(result).toEqual(mockProduct);
  });

  it("getProducts should call prisma.product.findMany", async () => {
    const mockProducts = [
      { id: 1, name: "Product A", price: 100 },
      { id: 2, name: "Product B", price: 200 },
    ];
    (prisma.product.findMany as any).mockResolvedValue(mockProducts);

    const result = await productService.getProducts();

    expect(prisma.product.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
  });

  it("getProductById should call prisma.product.findUnique", async () => {
    const mockProduct = { id: 1, name: "Product A", price: 100 };
    (prisma.product.findUnique as any).mockResolvedValue(mockProduct);

    const result = await productService.getProductById(1);

    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockProduct);
  });

  it("updateProduct should call prisma.product.update", async () => {
    const mockProduct = { id: 1, name: "Updated Product", price: 120 };
    (prisma.product.update as any).mockResolvedValue(mockProduct);

    const result = await productService.updateProduct(1, {
      name: "Updated Product",
      price: 120,
    });

    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: "Updated Product", price: 120 },
    });
    expect(result).toEqual(mockProduct);
  });

  it("deleteProduct should call prisma.product.delete", async () => {
    const mockProduct = { id: 1, name: "Deleted Product", price: 100 };
    (prisma.product.delete as any).mockResolvedValue(mockProduct);

    const result = await productService.deleteProduct(1);

    expect(prisma.product.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockProduct);
  });
});
