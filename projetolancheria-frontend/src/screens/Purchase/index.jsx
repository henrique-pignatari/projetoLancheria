import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/app';
import uuid from 'react-uuid';

import { calculatePrice } from '../../utils/functions';

import PurchaseList from '../../components/PurchaseList';
import ProductEditModal from '../../components/ProductEditModal';
import Frame from '../../components/Frame';

import './styles.css'
import ProductsModal from '../../components/PruductsModal';
import OpenProductModalButton from '../../components/OpenProductModalButton';

const Purchase = () => {

   const { //GETS ALL THE NEEDED VARIABLES OF THE CONTEXT
      purchase, 
      addPurchase, 
      setPurchaseProducts,
      changeProduct,
      getIngredients
   } = useContext(AppContext);

   //PRODUCTS FETCHED FROM THE SERVER
   const [DbProducts, setDbProducts] = useState([]);
   const [DbIngredients, setDbIngredients] = useState([]);

   //IF MODALS ARE SHOWN
   const [modalShow,setModalShow] = useState(false);
   const [editModalShow,setEditModalShow] = useState(false);
   
   //PRUDUCT THAT WILL BE EDITED
   const [editedProduct, setEditedProduct] = useState({});

   useEffect(()=>{ //GETS THE PURCHASE THAT IS IN THE LOCAL STORAGE
      let storedPurchase = JSON.parse(localStorage.getItem("Products"));

      getIngredients();
      
      if(!storedPurchase){
         storedPurchase = []
      }

      setPurchaseProducts(storedPurchase);
   },[])

   //#### PRODUCTS
   const calculateTotal = () =>{ //CALCULATES TOTAL PURCHASE PRICE
      let totalPrice = 0;
      purchase.purchaseProducts.map((p)=>{
         totalPrice += calculatePrice(p);
      });

      return totalPrice;
   }

   //##### MODALS
   const handleProductConfirm = (product) =>{ //HANDLES WITH PRODUCT PICKING INSIDE MODAL
      const id = product.id;
      console.log(id);
      const newPurchase = {...DbProducts.find(p => p.id == id)}
      newPurchase.id = uuid();
      addPurchase(newPurchase);
      setModalShow(false);
   }
   
   const handleEditConfirm = (product) =>{ //HANDLER TO CONFIRM THE PRODUCT CHANGES
      changeProduct(product);
   }

   return (
      <>
         {
            modalShow &&
            <ProductsModal
               title={'Escolha seu lanche:'}
               cancelButtonText={'CANCELAR'}
               DbProducts={DbProducts}
               setModalShow = {setModalShow}
               handleProductConfirm = {handleProductConfirm}
               //USED FOR OPENING THE PERSONALIZED PRODUCT MODAL
               DbIngredients={DbIngredients}
               setDbIngredients={setDbIngredients}
               setEditModalShow={setEditModalShow}
            />
         }

         {
            editModalShow &&
            <ProductEditModal
               title={'MONTE SEU LANCHE:'}
               cancelButtonText = {"Cancelar"}
               confirmButtonText = {"Confirmar"}
               item={editedProduct}
               setEditModalShow={setEditModalShow}
               handleEditConfirm={handleEditConfirm}
            />
         }
         
         <div className="purchase-container">
            <div className="content">
               <Frame
                  headerText={'FAÇA SEU PEDIDO:'}
               >
                  {
                     purchase.purchaseProducts.length < 1?
                     <h1 style={{color: 'white'}}>ADICIONE SEU PRIMEIRO LANCHE!</h1>
                     :
                     <PurchaseList 
                        items={purchase.purchaseProducts}
                        DbIngredients={DbIngredients}
                        setDbIngredients={setDbIngredients}
                        setEditModalShow={setEditModalShow}
                        setEditedProduct={setEditedProduct}
                     />
                  }
                  
                  {
                     purchase.purchaseProducts.length < 1?
                        null
                     :
                        <h1 className='purchase-total'>TOTAL: R${calculateTotal().toFixed(2)}</h1>
                  }
                  <OpenProductModalButton
                     setModalShow={setModalShow}
                     DbProducts={DbProducts}
                     setDbProducts={setDbProducts}  
                     editedProduct={editedProduct}
                  >
                     <div
                        className='button-add-product'
                     >
                        ADICIONAR LANCHE
                     </div>
                  </OpenProductModalButton>
               </Frame>
            </div>
         </div>
      </>
   );
}
 
export default Purchase;