import axios from "axios";
import { createContext, useState } from "react";
import uuid from "react-uuid";
import { urlConstants } from "../utils/constants";

export const AppContext = createContext();

export const AppProvider = ({children}) =>{
   const [responsiveWidth, setResponsiveWidth] = useState(
      window.matchMedia("(min-width: 900px)").matches
   )

   const [products, setProducts] = useState([]);
   const [ingredients, setIngredients] = useState([]);
   const [purchase, setPurchase] = useState({purchaseProducts: []})

   //###### PRODUCTS
   const getProducts = async () => {
      // if(products.length < 1){
      //    fetchProducts()
      //    .then(response =>{
      //       setProducts(response);
      //       return response
      //    })
      // }
      // return products
      const {data} = await axios.get(
         urlConstants.PRODUCTS_URL
      )
      return data;
   }

   const fetchProducts = async () => {
      const {data} = await axios.get(
         urlConstants.PRODUCTS_URL
      )
      return data;
   }

   //###### INGREDIENTS
   const getIngredients = () => {
      if(ingredients.length < 1){
         fetchIngredients()
         .then(response =>{
            setIngredients(response);
            console.log(response)
            localStorage.setItem("Ingredients",JSON.stringify(response))
            return response
         })
      }
      return ingredients;
   }

   const fetchIngredients = async () =>{
      const {data} = await axios.get(
         urlConstants.INGREDIENTS_URL
      )
      return data;
   }

   const updateIngredientPrice = async(newIngredient) =>{
      await axios.put(`${urlConstants.INGREDIENTS_URL}/admin`, {...newIngredient})
   }

   //###### PURCHASE
   const addPurchase = (product) =>{
      let newPurchase = {...purchase}
      newPurchase.purchaseProducts.push(product)
      setPurchase(newPurchase);
      localStorage.setItem("Products",JSON.stringify(newPurchase.purchaseProducts))
   }

   const deletePurchase = (id) => {
      let newPurchase = {...purchase}
      newPurchase.purchaseProducts = 
      newPurchase.purchaseProducts.filter((product)=>(
         product.id != id
      ));
      
      setPurchase(newPurchase);
      localStorage.setItem("Products",JSON.stringify(newPurchase.purchaseProducts))
   }

   const setPurchaseProducts = (products)=>{
      let newPurchase = {...purchase}
      newPurchase.purchaseProducts = products
      setPurchase(newPurchase);
      localStorage.setItem("Products",JSON.stringify(newPurchase.purchaseProducts))
   }

   const changeProduct = (product) =>{
      let newPurchase = {...purchase}
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
      <AppContext.Provider value={
         {
            getProducts,
            ingredients,
            getIngredients,
            updateIngredientPrice,
            purchase,
            addPurchase,
            setPurchaseProducts,
            deletePurchase,
            changeProduct,
            responsiveWidth,
            setResponsive
         }}
      >
         {children}
      </AppContext.Provider>
   )

}