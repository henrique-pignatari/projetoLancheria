import axios from "axios";
import { createContext, useState } from "react";
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
   const getProducts = () => {
      if(products.length < 1){
         const fetchedProducts = fetchProducts();

         setProducts(fetchedProducts);
         return fetchedProducts
      }
      return products
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
         const fetchedIngredients = fetchIngredients();
         setIngredients(fetchedIngredients);
         return fetchedIngredients;
      }
      return ingredients;
   }

   const fetchIngredients = async () =>{
      const {data} = await axios.get(
         urlConstants.INGREDIENTS_URL
      )
      console.log(data)
      return data;
   }

   const setResponsive = matches =>{
      setResponsiveWidth(matches)
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
      newPurchase.purchaseProducts = newPurchase.purchaseProducts.filter((product)=>(product.id != id));
      setPurchase(newPurchase);
      localStorage.setItem("Products",JSON.stringify(newPurchase.purchaseProducts))
   }

   const setPurchaseProducts = (products)=>{
      let newPurchase = {...purchase}
      newPurchase.purchaseProducts = products
      setPurchase(newPurchase);
      localStorage.setItem("Products",JSON.stringify(newPurchase.purchaseProducts))
   }

   return(
      <AppContext.Provider value={
         {
            getProducts,
            getIngredients,
            purchase,
            addPurchase,
            setPurchaseProducts,
            deletePurchase,
            responsiveWidth,
            setResponsive
         }}
      >
         {children}
      </AppContext.Provider>
   )

}