import { test, expect } from '@playwright/test';
import type { ProductType } from '../types/ddt-products-dataset';
import productsDataset from '../data/products.json';

const testData: ProductType[] = productsDataset as ProductType[];

test.describe('Data Driven Testing for Products API', () => {
  for (const product of testData) {
    test(`Check product: ${product.title} (ID: ${product.id})`, async ({ request }) => {
      
      const response = await request.get(`https://dummyjson.com/products/${product.id}`);
      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(data.title).toBe(product.title);
      expect(data.price).toBe(product.expectedPrice);
    });
  }
});