export const calculatePrice = (item) => {
   let totalPrice = 0;
   let hasBacon, hasAlface = false;

   item.materials.map((material) =>{

      const {
         description,
         price
      } = material.ingredient;

      const quantity = material.quantity;
      const ingredientPrice = ingredientPriceCalcs[description]

      if(ingredientPrice){ 
         totalPrice += ingredientPrice(price,quantity);
      }

      if(description == 'Alface'){
         hasAlface = true;
      }

      if(description == 'Bacon'){
         hasBacon = true;
      }
   })

   if(hasAlface && !hasBacon){
      return totalPrice * 0.9;
   }
   
   return totalPrice
}

const ingredientPriceCalcs = { //Defines the business rules for each ingredient
   Hamburguer(price,quantity){
      return price * Math.ceil(quantity-(quantity/3));
   },

   Queijo(price,quantity){
      return price * Math.ceil(quantity-(quantity/3));
   },

   Ovo(price,quantity){
      return price * quantity;
   },

   Bacon(price,quantity){
      return price * quantity;
   },

   Alface(price,quantity){
      return price * quantity;
   },
}