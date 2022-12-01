import React, { useContext } from 'react';
import { AppContext } from '../../contexts/app';

import './styles.css'

const OpenProductModalButton = ({
   children,
   setModalShow,
   DbProducts,
   setDbProducts,
}) => {
   const {getProducts} = useContext(AppContext);

   const handleModalOpen = () =>{
      if(DbProducts.length < 1){ //IF THE PRODUCTS THAT CAME FROM THE ARRAY ARE THERE
         fetchProducts() //FETCHES PRODUCTS
         .then((response)=>{
            setDbProducts(response); //POPULATES THE DB PRODUCTS WITH SERVER RESPONSE
            console.log(JSON.stringify(response));
            setModalShow(true);
         });
         return;
      }
      setModalShow(true);
   }

   const fetchProducts = () => { //FETCHES PRODUCTS
      const products = getProducts();
      return products;
   }

   return ( 
      <button
         className='product-modal-open-button'
         onClick={handleModalOpen}
      >
         {children}
      </button>
   );
}
 
export default OpenProductModalButton;