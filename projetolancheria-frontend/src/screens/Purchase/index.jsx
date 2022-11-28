import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/app';
import { calculatePrice } from '../../utils/functions';
import Modal from '../../components/Modal';
import uuid from 'react-uuid';

import './styles.css'
import PurchaseList from '../../components/PurchaseList';
import ProductEditModal from '../../components/ProductEditModal';

const Purchase = () => {
   const {
      purchase, 
      addPurchase, 
      setPurchaseProducts, 
      getProducts,
      getIngredients,
   } = useContext(AppContext);

   const [DbProducts, setDbProducts] = useState([]);
   const [DbIngredients, setDbIngredients] = useState([]);
   const [modalShow,setModalShow] = useState(false);
   const [editModalShow,setEditModalShow] = useState(false);
   const [editedProduct, setEditedProduct] = useState({});

   useEffect(()=>{
      let storedPurchase = JSON.parse(localStorage.getItem("Products"));
      if(!storedPurchase){
         storedPurchase = []
      }
      setPurchaseProducts(storedPurchase);
   },[])

   const handleProductAddButton = () =>{

      if(DbProducts.length < 1){
         fetchProducts()
         .then((response)=>{
            setDbProducts(response);
            setModalShow(true);
         });
         return;
      }
      setModalShow(true);
   }

   const fetchProducts = async () => {
      const products = await getProducts();
      return products;
   }

   const handleProductConfirm = (id) =>{
      const newPurchase = {...DbProducts.find(p => p.id == id)}
      newPurchase.id = uuid();
      addPurchase(newPurchase);
      setModalShow(false);
   }

   const calculateTotal = () =>{
      let totalPrice = 0;
      purchase.purchaseProducts.map((p)=>{
         totalPrice += calculatePrice(p);
      })

      return totalPrice;
   }

   const openProductEditModal = (product) =>{
      setEditedProduct(product);

      if(DbIngredients.length < 1){
         fetchIngredients()
         .then((response)=>{
            setDbIngredients(response);
            setEditModalShow(true);
         });
         return;
      }
      setEditModalShow(true);
   }

   const fetchIngredients = async () =>{
      const ingredients = await getIngredients();
      return ingredients;
   }

   return (
      <>
      {
         modalShow &&
         <Modal
            setModalShow={setModalShow}
            title={'Escolha seu lanche:'}
            cancelButtonText = {'CANCELAR'}
            handleModalConfirm = {handleProductConfirm}
         >
            <div className="products-button-container">
               {
                  DbProducts.map(product => (
                     <button
                        onClick={()=>handleProductConfirm(product.id)}
                        key={product.id}
                     >
                        <div className="modal-description-wrapper">
                           <h1>{product.description}</h1>
                           {
                              product.materials.map((material)=>(
                                 <span key={material.ingredient.id}>{material.ingredient.description} </span>
                              ))
                           }
                        </div>
                           <span className='product-price'>R$ {calculatePrice(product).toFixed(2)}</span>
                     </button>
                  ))
               }
            </div>
         </Modal>
      }

      {
         editModalShow &&
         <ProductEditModal
            item={editedProduct}
            title={'MONTE SEU LANCHE:'}
            setEditModalShow={setEditModalShow}
         />
      }
      
         <div className="purchase-container">
            <div className="content">
               <div className="frame">
                  <div className="frame-container">   
                     <h1 className='frame-header'>
                        FAÇA SEU PEDIDO:
                     </h1>
                     {
                        purchase.purchaseProducts.length < 1?
                        <h1 style={{color: 'white'}}>ADICIONE SEU PRIMEIRO LANCHE!</h1>
                        :
                        <PurchaseList 
                           openProductEditModal={openProductEditModal}
                           items={purchase.purchaseProducts}
                        />
                     }
                     
                     {
                        purchase.purchaseProducts.length < 1?
                        <></>
                        :
                        <h1 className='purchase-total'>TOTAL: R${calculateTotal().toFixed(2)}</h1>
                     }
                  </div>
                  <button
                     onClick={handleProductAddButton}
                     className='button-add-product'
                  >ADICIONAR LANCHE</button>
               </div>
            </div>
         </div> 
      </>
   );
}
 
export default Purchase;