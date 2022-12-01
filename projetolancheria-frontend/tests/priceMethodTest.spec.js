import axios from 'axios'
import calculatePriceTest from './calculatePriceTest';
import Products from './ProducTest'

jest.mock('axios');

describe('TESTING PRICE CALCULATE METHOD', () => {

   test("TEST LIGHT PROMO",()=>{
      const materials1 = [
         {
            ingredient:{
               description: "Alface",
               price: 0.4,
            },
            quantity: 1,
         },

         {
            ingredient:{
               description: "Hamburguer",
               price: 3,
            },
            quantity: 1,
         },

         {
            ingredient:{
               description: "Queijo",
               price: 1.5,
            },
            quantity: 1,
         },   
      ];

      const materials2 = [
         {
            ingredient:{
               description: "Alface",
               price: 0.4,
            },
            quantity: 1,
         },

         {
            ingredient:{
               description: "Hamburguer",
               price: 3,
            },
            quantity: 1,
         },

         {
            ingredient:{
               description: "Bacon",
               price: 2,
            },
            quantity: 1,
         },
      ]
      
      const product1 = {
         materials: materials1
      }

      const product2 = {
         materials: materials2
      }
      
      const prices =calculatePriceTest.testCalculateMethod([product1,product2])

      expect(prices[0]).toBe(4.41)
      expect(prices[1]).toBe(5.4)
   })

   test("TEST HAMBURGUER PROMO",()=>{
      const materials1 = [
         {
            ingredient:{
               description: "Bacon",
               price: 2,
            },
            quantity: 1,
         },

         {
            ingredient:{
               description: "Hamburguer",
               price: 3,
            },
            quantity: 4,
         },

         {
            ingredient:{
               description: "Queijo",
               price: 1.5,
            },
            quantity: 1,
         },   
      ];

      const materials2 = [
         {
            ingredient:{
               description: "Bacon",
               price: 2,
            },
            quantity: 1,
         },

         {
            ingredient:{
               description: "Hamburguer",
               price: 3,
            },
            quantity: 1,
         },

         {
            ingredient:{
               description: "Queijo",
               price: 1.5,
            },
            quantity: 1,
         },
      ]

      const product1 = {
         materials: materials1
      }

      const product2 = {
         materials: materials2
      }
      
      const prices =calculatePriceTest.testCalculateMethod([product1,product2])

      expect(prices[0]).toBe(12.5)
      expect(prices[1]).toBe(6.5)
   })

   test("TEST CHEESE PROMO",()=>{
      const materials1 = [
         {
            ingredient:{
               description: "Bacon",
               price: 2,
            },
            quantity: 1,
         },

         {
            ingredient:{
               description: "Hamburguer",
               price: 3,
            },
            quantity: 1,
         },

         {
            ingredient:{
               description: "Queijo",
               price: 1.5,
            },
            quantity: 4,
         },   
      ];

      const materials2 = [
         {
            ingredient:{
               description: "Bacon",
               price: 2,
            },
            quantity: 1,
         },

         {
            ingredient:{
               description: "Hamburguer",
               price: 3,
            },
            quantity: 1,
         },

         {
            ingredient:{
               description: "Queijo",
               price: 1.5,
            },
            quantity: 1,
         },
      ]

      const product1 = {
         materials: materials1
      }

      const product2 = {
         materials: materials2
      }
      
      const prices =calculatePriceTest.testCalculateMethod([product1,product2])

      expect(prices[0]).toBe(9.5)
      expect(prices[1]).toBe(6.5)
   })
});