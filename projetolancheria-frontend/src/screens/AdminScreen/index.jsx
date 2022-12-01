import React, { useContext, useState } from 'react';
import Frame from '../../components/Frame';
import OpenIngredientEditModalButton from '../../components/OpenIngredientEditModalButton';
import OpenProductModalButton from '../../components/OpenProductModalButton';
import ProductEditModal from '../../components/ProductEditModal';
import ProductsModal from '../../components/PruductsModal';
import { AppContext } from '../../contexts/app';

import './styles.css'

const AdminScreen = () => { //SCREEN FOR ADMINS
   const {
      responsiveWidth,
      setIngredients,
      updateIngredientPrice,
   } = useContext(AppContext);

   const [DbIngredients, setDbIngredients] = useState([]);

   const [editPriceModalShow, setEditPriceModalShow] = useState(false);

   const handleEditConfirm = (product) =>{ //HANDLER TO CONFIRM THE PRODUCT CHANGES
      product.materials.map((m)=>{
         m.ingredient.price = m.quantity;
         updateIngredientPrice({
            description: m.ingredient.description,
            price: m.ingredient.price,
         });
      });    
      setIngredients([]); 
   }

   return ( 
      <div className='admin-container'>

         {
            editPriceModalShow &&
            <ProductEditModal
               title={'MODIFIQUE OS PREÇOS:'}
               cancelButtonText = {"Cancelar"}
               confirmButtonText = {"Confirmar"}
               setEditModalShow={setEditPriceModalShow}
               handleEditConfirm={handleEditConfirm}
            />
         }
         
         <div className="content"> 
            <div 
               style={
                  !responsiveWidth? 
                  {
                     flexDirection: 'column'
                  }:{}
               }  
               className="frame-wraper"
            >
               <OpenIngredientEditModalButton
                  DbIngredients={DbIngredients}
                  setDbIngredients={setDbIngredients}
                  setEditModalShow={setEditPriceModalShow}
               >
                  <div className="admin-frame">
                     <Frame
                        headerText={'Modificar preços dos ingredientes'}
                     /> 
                  </div>
               </OpenIngredientEditModalButton>
            </div>
            
         </div>
      </div>
   );
}
 
export default AdminScreen;