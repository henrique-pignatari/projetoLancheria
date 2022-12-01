import React, { useContext } from 'react';
import { AppContext } from '../../contexts/app';

import './styles.css'

const OpenIngredientEditModalButton = ({
   children,
   DbIngredients,
   setDbIngredients,
   setEditModalShow,
}) => {
   
   const {getIngredients} = useContext(AppContext);

   const openEditModal = () =>{
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

   const fetchIngredients = async () =>{ //FETCHES INGREDIENTS 
      const ingredients = await getIngredients();
      return ingredients;
   }

   return ( 
      <button
         onClick={openEditModal}
         className='open-ingredient-edit-button'
      >
         {children}
      </button>
   );   
}
 
export default OpenIngredientEditModalButton;