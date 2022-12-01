import React from 'react';
import { calculatePrice } from '../../utils/functions';
import Modal from '../Modal';
import OpenIngredientEditModalButton from '../OpenIngredientEditModalButton';

import './styles.css'

const ProductsModal = ({
   title,
   cancelButtonText,
   DbProducts,
   setModalShow,
   handleProductConfirm,
   DbIngredients,
   setDbIngredients,
   setEditModalShow
}) => {

   return ( 
      <Modal
         setModalShow={setModalShow}
         title={title}
         cancelButtonText = {cancelButtonText}
         DbProducts={DbProducts}
         handleProductConfirm={handleProductConfirm}
      >
         <div className="products-button-container">
            {
               DbProducts.map(product => ( //MAPS THE DB PRODUCTS AND CREATS A BUTTON CONTAINING THE PRODUCTS INFO
                  <button
                     onClick={()=>handleProductConfirm(product)}
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
            
            {
               DbIngredients < 1?

               <OpenIngredientEditModalButton
                  DbIngredients={DbIngredients}
                  setDbIngredients={setDbIngredients}
                  setEditModalShow={setEditModalShow}
               >
                  <div 
                  onClick={()=>{setModalShow(false)}}
                  className="modal-description-wrapper">
                     <h1>PERSONALIZADO</h1>
                  </div>
                     <span className='product-price'>R$ --.--</span>
               </OpenIngredientEditModalButton>
               :<></>
            }
         </div>
      </Modal>
   );

   }

export default ProductsModal;