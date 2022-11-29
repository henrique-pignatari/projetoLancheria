import React, { useContext, useState } from 'react';
import uuid from 'react-uuid';
import { AppContext } from '../../contexts/app';
import Modal from '../Modal';

import './styles.css'

const ProductEditModal = ({
   setEditModalShow,
   title,
   cancelButtonText,
   confirmButtonText,
   handleEditConfirm,
   item,
}) => {
   const {ingredients} = useContext(AppContext);

   const [inputStates, setInputStates] = useState({});

   const handleInputChange = (description, e) =>{
      let newInputStates = {...inputStates}
      newInputStates[description] = e.target.value;
      setInputStates(newInputStates);
   }

   const handleModalConfirm = ()=>{
      let newProduct = {
         id: item.id || uuid(),
         description: "Personalizado",
         materials: [],
      };
      
      ingredients.forEach(ingredient => {
         if(inputStates[ingredient.description]>0){
            let material ={
               ingredient:{
                  description: ingredient.description,
                  price: ingredient.price,
               },
               quantity: parseInt(inputStates[ingredient.description])
            }
            newProduct.materials.push(material);
         }         
      });

      handleEditConfirm(newProduct);
   }

   return ( 
      <Modal
         setModalShow={setEditModalShow}
         title={title}
         cancelButtonText = {cancelButtonText}
         confirmButtonText = {confirmButtonText}
         handleModalConfirm = {handleModalConfirm}
      >   
      {
         ingredients.map(ingredient=>(
            <div className="ingredient-container">
               <h1 key={ingredient.id}>
               {ingredient.description}
               </h1>
               <input
                  onChange={(e)=>{
                     handleInputChange(ingredient.description,e)
                  }}
                  min="0"
                  type="number"
               />
            </div>
         ))
      }
      </Modal>
   );
}
 
export default ProductEditModal;