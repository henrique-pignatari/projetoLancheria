import {calculatePrice} from '../src/utils/functions'

class calculatePriceTest{
   static testCalculateMethod = (products) =>{
      const productsPrices = [];
      
      products.map(product =>{
         productsPrices.push(calculatePrice(product));
      })

      return productsPrices;
   }
}

export default calculatePriceTest