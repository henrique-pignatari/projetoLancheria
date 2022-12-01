import axios from 'axios'
import calculatePriceTest from './calculatePriceTest';
import Products from './producTest'

jest.mock('axios');

describe('TESTING MENU PRODUCTS', () => {
   let products = [];

   axios.get.mockResolvedValue();

   Products.getMenuProducsts()
   .then(data=>{
      products = data;
   })

   test('TEST HOW MANY PRODUCTS THERE ARE', () => {
      expect(products).toHaveLength(4);
   });

   test('TEST IF PRODUCT DATA STRUCTURE IS CORRECT', () => {
      products.map((product,i)=>{
         expect(product).toHaveProperty('description');
         expect(product.materials[i]).toHaveProperty('ingredient');
         expect(product.materials[i].ingredient).toHaveProperty('description');
         expect(product.materials[i].ingredient).toHaveProperty('price');
      })
   });

   test('TEST IF ALL THE PRODUCTS EXISTS', () => {
      const expectedProducts = ["X-BACON", "X-BURGUER", "X-EGG","X-EGGBACON"];
      expectedProducts.forEach((description)=>{

         expect(products.find((product)=>(
            product.description === description
         )).description).toBe(description)
      })
   });

   test('TEST IF PRODUCTS HAVE THE CORRECT PRICE', () => {
      const correctPrices = [6.5, 4.5, 5.3, 7.3];
      const calculatedPrices = calculatePriceTest.testCalculateMethod(products);

      expect(calculatedPrices).toEqual(correctPrices);
   });
});