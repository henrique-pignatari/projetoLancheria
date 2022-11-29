//IMPORTS
import { createContext, useState } from "react";
import axios from "axios";

import { urlConstants } from "../utils/constants";
export const AppContext = createContext();


export const AppProvider = ({children}) =>{ //PROVIDER COMPONENT A SINGLE COMPONENT TO WRAP THE APP

   const [responsiveWidth, setResponsiveWidth] = useState( //THIS STATE CHECKS THE MEDIA WIDTH, USED FOR "MEDIA QUERY"
      window.matchMedia("(min-width: 900px)").matches
   )

   //MAIN VARIABLES THAT THE CONTEXT SHALL PROVIDE
   const [ingredients, setIngredients] = useState([]);
   const [purchase, setPurchase] = useState({purchaseProducts: []})

   //###### PRODUCTS
   const getProducts = async () => { //DOES A HTTP GET TO THE PRODUCTS ENDPOINT
      const {data} = await axios.get(
         urlConstants.PRODUCTS_URL
      )
      return data;
   }

   //###### INGREDIENTS
   const getIngredients = () => { //HANDLES WITH SPECIFIC ASYNCRONOUS TASKS REGARDING INGREDIENT FETCH
      if(ingredients.length < 1){
         fetchIngredients()
         .then(response =>{
            setIngredients(response);
            return response
         })
      }
      return ingredients;
   }

   const fetchIngredients = async () =>{ //DOES A HTTP GET TO THE INGREDIENTS ENDPOINT
      const {data} = await axios.get(
         urlConstants.INGREDIENTS_URL
      )
      return data;
   }

   const updateIngredientPrice = async(newIngredient) =>{ //DOES A HTTP PUT TO THE INGREDIENTS ENDPOINT
      await axios.put(
         `${urlConstants.INGREDIENTS_URL}/admin`, 
         {...newIngredient}
      )
   }

   //###### PURCHASE
   const addPurchase = (product) =>{ //ADDS A NEW PRODUCT TO THE PURCHASE ARRAY
      let newPurchase = {...purchase}
      newPurchase.purchaseProducts.push(product);

      setPurchase(newPurchase);
      localStorage.setItem("Products",JSON.stringify(newPurchase.purchaseProducts))
   }

   const deletePurchase = (id) => { //DELETES A PRODUCT TO THE PURCHASE ARRAY
      let newPurchase = {...purchase};

      newPurchase.purchaseProducts = 
      newPurchase.purchaseProducts.filter((product)=>(
         product.id != id
      ));
      
      setPurchase(newPurchase);
      localStorage.setItem("Products",JSON.stringify(newPurchase.purchaseProducts));
   }

   const setPurchaseProducts = (products)=>{ //CHANGES THE PRODUCTS OF THE PURCHASE
      let newPurchase = {...purchase};
      
      newPurchase.purchaseProducts = products;

      setPurchase(newPurchase);
      localStorage.setItem("Products",JSON.stringify(newPurchase.purchaseProducts))
   }

   const changeProduct = (product) =>{ //UPDATES A SPECIFIC PRODUCT OF THE PURCHASE 
      let newPurchase = {...purchase};

      newPurchase.purchaseProducts = 
      newPurchase.purchaseProducts.filter((p)=>(
         p.id != product.id
      ));

      newPurchase.purchaseProducts.push(product);
      setPurchase(newPurchase);
   }

   ////###### UTILS
   const setResponsive = matches =>{
      setResponsiveWidth(matches)
   }

   return(
      <AppContext.Provider value={ //THE APP CONTEXT PROVIDER
         {
            //ALL THE VARIABLES AND FUCTIONS PROVIDED
            //PRODUCTS
            getProducts,
            //INGREDIENTS
            ingredients,
            getIngredients,
            updateIngredientPrice,
            //PURCHASE
            purchase,
            addPurchase,
            setPurchaseProducts,
            deletePurchase,
            changeProduct,
            //UTILS
            responsiveWidth,
            setResponsive
         }}
      >
         {children}
      </AppContext.Provider>
   )

}