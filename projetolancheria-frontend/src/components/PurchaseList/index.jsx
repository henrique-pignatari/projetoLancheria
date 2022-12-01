import React, { useContext } from 'react';
import uuid from 'react-uuid';
import { AppContext } from '../../contexts/app';

import Purchase from '../Purchase';

import './styles.css'

const PurchaseList = ({
   items,
   DbIngredients,
   setDbIngredients,
   setEditModalShow,
   setEditedProduct
}) => {
   const {ingredients} = useContext(AppContext);

   return ( 
      ingredients.length > 1?
      <div className="list-container">
         {
            items.map(item => {
            item.materials.map((material)=>{
               material.ingredient.price = ingredients.find((ingredient)=>(
                  ingredient.description === material.ingredient.description
               )).price;
            })
           return <Purchase 
               key={uuid()} 
               item={item}
               DbIngredients={DbIngredients}
               setDbIngredients={setDbIngredients}
               setEditModalShow={setEditModalShow}
               setEditedProduct={setEditedProduct}
            /> 
            })
         }
      </div>
      :
      <></>
   );
}
 
export default PurchaseList;