import axios from "axios";
import {urlConstants} from "../src/utils/constants"

class Products{
   static getMenuProducsts(){
      return axios
      .get(urlConstants.PRODUCTS_URL)
      .then(() => {
         return getProductsJSON();
      });
   }
}

const getProductsJSON = () => {
   return JSON.parse(`[{"id":1,"description":"X-BACON","materials":[{"id":1,"ingredient":{"id":1,"description":"Bacon","price":2},"quantity":1},{"id":2,"ingredient":{"id":2,"description":"Hamburguer","price":3},"quantity":1},{"id":3,"ingredient":{"id":3,"description":"Queijo","price":1.5},"quantity":1}]},{"id":2,"description":"X-BURGUER","materials":[{"id":4,"ingredient":{"id":4,"description":"Hamburguer","price":3},"quantity":1},{"id":5,"ingredient":{"id":5,"description":"Queijo","price":1.5},"quantity":1}]},{"id":3,"description":"X-EGG","materials":[{"id":6,"ingredient":{"id":6,"description":"Ovo","price":0.8},"quantity":1},{"id":7,"ingredient":{"id":7,"description":"Hamburguer","price":3},"quantity":1},{"id":8,"ingredient":{"id":8,"description":"Queijo","price":1.5},"quantity":1}]},{"id":4,"description":"X-EGGBACON","materials":[{"id":9,"ingredient":{"id":9,"description":"Ovo","price":0.8},"quantity":1},{"id":10,"ingredient":{"id":10,"description":"Bacon","price":2},"quantity":1},{"id":11,"ingredient":{"id":11,"description":"Hamburguer","price":3},"quantity":1},{"id":12,"ingredient":{"id":12,"description":"Queijo","price":1.5},"quantity":1}]}]`)
}

export default Products;