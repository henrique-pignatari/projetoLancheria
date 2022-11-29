export const calculatePrice = (item) => { //CALCULATES THE PRICES
   let totalPrice = 0;
   let hasBacon, hasAlface = false;
   const LIGHT_DISCOUNT = 0.9;

   item.materials.map((material) =>{ //MAP EVERY MATERIAL IN THE LIST AND SUMS ITS PRICE

      //GETTING THE VARIABLES
      const {
         description,
         price
      } = material.ingredient;
      const quantity = material.quantity;

      const ingredientPrice = ingredientPriceCalcs[description]; //GETS THE SPECIF BUSINESS RULE FOR THAT INGREDIENT

      if(ingredientPrice){ //IF THE BUSINESS RULE EXISTS SUM THE PRICE
         totalPrice += ingredientPrice(price,quantity);
      }

      //CHECKS FOR ONE PROMOTION
      if(description == 'Alface'){
         hasAlface = true;
      }

      if(description == 'Bacon'){
         hasBacon = true;
      }
   })

   if(hasAlface && !hasBacon){ //IF PROMOTION IS FULLFILED APLIES DISCOUNT
      return totalPrice * LIGHT_DISCOUNT;
   }
   
   return totalPrice;
}

const ingredientPriceCalcs = { //DEFINES THE BUSINESS RULES FOR EACH INGREDIENT
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