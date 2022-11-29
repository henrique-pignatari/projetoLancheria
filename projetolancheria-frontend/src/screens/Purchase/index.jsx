import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/app';
import uuid from 'react-uuid';

import { calculatePrice } from '../../utils/functions';

import Modal from '../../components/Modal';
import PurchaseList from '../../components/PurchaseList';
import ProductEditModal from '../../components/ProductEditModal';

import './styles.css'

const Purchase = () => {

   const { //GETS ALL THE NEEDED VARIABLES OF THE CONTEXT
      purchase, 
      addPurchase, 
      setPurchaseProducts, 
      getProducts,
      getIngredients,
      changeProduct,
   } = useContext(AppContext);

   //PRODUCTS FETCHED FROM THE SERVER
   const [DbProducts, setDbProducts] = useState([]);
   const [DbIngredients, setDbIngredients] = useState([]);

   //IF MODALS ARE SHWN
   const [modalShow,setModalShow] = useState(false);
   const [editModalShow,setEditModalShow] = useState(false);

   //PRUDUCT THAT WILL BE EDITED
   const [editedProduct, setEditedProduct] = useState({});

   useEffect(()=>{ //GETS THE PURCHASE THAT IS IN THE LOCAL STORAGE
      let storedPurchase = JSON.parse(localStorage.getItem("Products"));

      if(!storedPurchase){
         storedPurchase = []
      }

      setPurchaseProducts(storedPurchase);
   },[])

   //#### PRODUCTS
   const fetchProducts = () => { //FETCHES PRODUCTS
      const products = getProducts();
      return products;
   }

   const calculateTotal = () =>{ //CALCULATES TOTAL PURCHASE PRICE
      let totalPrice = 0;
      purchase.purchaseProducts.map((p)=>{
         totalPrice += calculatePrice(p);
      });

      return totalPrice;
   }

   //##### INGREDIENTS   
   const fetchIngredients = async () =>{ //FETCHES INGREDIENTS 
      const ingredients = await getIngredients();
      return ingredients;
   }

   //##### MODALS
   //PRODUCT SELECT MODAL
   const handleProductAddButton = () =>{ //HANDLES WITH INTERECTION WITH PRODUC ADD BUTTON
      if(DbProducts.length < 1){ //IF THE PRODUCTS THAT CAME FROM THE ARRAY ARE THERE
         fetchProducts() //FETCHES PRODUCTS
         .then((response)=>{
            setDbProducts(response); //POPULATES THE DB PRODUCTS WITH SERVER RESPONSE
            setModalShow(true);
         });
         return;
      }
      setModalShow(true);
   }

   const handleProductConfirm = (id) =>{ //HANDLES WITH PRODUCT PICKING INSIDE MODAL
      const newPurchase = {...DbProducts.find(p => p.id == id)}
      newPurchase.id = uuid();
      addPurchase(newPurchase);
      setModalShow(false);
   }

   const openProductEditModal = (product) =>{ //OPENS MODAL FOR EDITING THE PRODUCTS
      setEditedProduct(product); //SETS PRODUCT FOR EDITING

      if(DbIngredients.length < 1){ //SAME PROCESS OF THE OTHER MODAL
         fetchIngredients()
         .then((response)=>{
            setDbIngredients(response);
            setEditModalShow(true);
         });
         return;
      }
      setEditModalShow(true);
   }
   
   const handleEditConfirm = (product) =>{ //HANDLER TO CONFIRM THE PRODUCT CHANGES
      changeProduct(product);
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
                  DbProducts.map(product => ( //MAPS THE DB PRODUCTS AND CREATS A BUTTON CONTAINING THE PRODUCTS INFO
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

                        <span className='product-price'>
                           R$ {calculatePrice(product).toFixed(2)}
                        </span>
                     </button>
                  ))
               }
               <button
                  onClick={()=>{
                     openProductEditModal();
                     setModalShow(false)
                  }}
               >
                  <div className="modal-description-wrapper">
                     <h1>PERSONALIZADO</h1>
                  </div>
                     <span className='product-price'>R$ --.--</span>
               </button>
            </div>
         </Modal>
      }

      {
         editModalShow &&
         <ProductEditModal
            item={editedProduct}
            setEditModalShow={setEditModalShow}
            title={'MONTE SEU LANCHE:'}
            cancelButtonText = {"Cancelar"}
            confirmButtonText = {"Confirmar"}
            handleEditConfirm={handleEditConfirm}
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
                        (purchase.purchaseProducts.length < 1)&&
                        <h1 className='purchase-total'>TOTAL: R${calculateTotal().toFixed(2)}</h1>
                     }
                  </div>

                  <button
                     onClick={handleProductAddButton}
                     className='button-add-product'
                  >
                     ADICIONAR LANCHE
                  </button>
               </div>
            </div>
         </div> 
      </>
   );
}
 
export default Purchase;