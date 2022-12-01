import React, { useContext } from 'react';
import { AppContext } from '../../contexts/app';

import { CgPen, CgClose} from "react-icons/cg";
import { calculatePrice } from '../../utils/functions';
import OpenIngredientEditModalButton from '../OpenIngredientEditModalButton';

import './styles.css'

const Purchase = ({
   item,
   DbIngredients,
   setDbIngredients,
   setEditModalShow,
   setEditedProduct,
}) => {
   const {deletePurchase,responsiveWidth} = useContext(AppContext);
   
   return (  
      <>
         <div className="item-container"> 
            <div className="item-description-container">
               <h1 
                  style={!responsiveWidth? 
                     {fontSize: 12}: 
                     {fontSize: 35}
                  } 
                  className='item-description'>{item.description}
               </h1>

               <span 
                  style={
                     !responsiveWidth? {
                        display: 'flex', 
                        flexDirection: 'row',
                        marginRight:5,
                     }
                     : {fontSize: 25}
                  }
                  className='item-price'
               >
                  <span style={!responsiveWidth? 
                     {fontSize: 10}: 
                     {
                        fontSize: 15,
                        marginRight: 10
                     }}
                  >
                     R$
                  </span>
                  <span>
                     {calculatePrice(item).toFixed(2)}
                  </span>
               </span>
            </div>

            <div className="item-options">
               <button
                  onClick={()=>{deletePurchase(item.id)}}
               >
                  <CgClose size={28}/>
               </button>
               <OpenIngredientEditModalButton
                  DbIngredients={DbIngredients}
                  setDbIngredients={setDbIngredients}
                  setEditModalShow={setEditModalShow}
               >
                  <CgPen 
                  onClick={()=>setEditedProduct(item)}
                  size={20}/>
               </OpenIngredientEditModalButton>
            </div>
         </div>
         <div className="separator"/>
      </>
   );
}
 
export default Purchase;