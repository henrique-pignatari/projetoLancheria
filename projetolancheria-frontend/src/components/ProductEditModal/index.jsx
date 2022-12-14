import React, { useContext, useState } from 'react';
import uuid from 'react-uuid';
import { AppContext } from '../../contexts/app';
import Modal from '../Modal';

import './styles.css'

const ProductEditModal = ({
   title,
   item,
   setEditModalShow,
   cancelButtonText,
   confirmButtonText,
   handleEditConfirm,
}) => {

   //TO CREAT THE INGREDIENT LIST
   const {ingredients} = useContext(AppContext);

   //STATE FOR TRACKING THE INPUTS CHANGES 
   const [inputStates, setInputStates] = useState({});

   const handleInputChange = (description, e) =>{ //UPDATES THE INPUT STATES
      let newInputStates = {...inputStates}
      newInputStates[description] = e.target.value;
      setInputStates(newInputStates);
   }

   const handleModalConfirm = ()=>{ //HANDLE EDIT CONFIRM
      let newProduct = { // CREATES A NEW PRODUCT TEMPLATE 
         id: item? item.id : uuid(),
         description: "Personalizado",
         materials: [],
      };
      
      ingredients.forEach(ingredient => { //ITERATES FOR EACH INGRIDIENT AND ADDS IT TO THE OBJECT
         if(inputStates[ingredient.description]>0){
            let material ={
               ingredient:{
                  description: ingredient.description,
                  price: ingredient.price,
               },
               quantity: parseFloat(inputStates[ingredient.description])
            }
            
            newProduct.materials.push(material);
         }         
      });

      if(newProduct.materials.length > 0){
         handleEditConfirm(newProduct);
      }
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
            <div  key={ingredient.id}
               className="ingredient-container"
            >
               <h1>
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