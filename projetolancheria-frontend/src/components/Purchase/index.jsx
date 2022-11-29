import React, { useContext } from 'react';

import { CgPen, CgClose} from "react-icons/cg";
import { AppContext } from '../../contexts/app';
import { calculatePrice } from '../../utils/functions';

import './styles.css'

const Purchase = ({item, openProductEditModal}) => {
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
                  >R$ </span>
                  {calculatePrice(item).toFixed(2)}
               </span>
            </div>
            <div className="item-options">
               <button
                  onClick={()=>{deletePurchase(item.id)}}
               ><CgClose size={28}/></button>
               <button
                  onClick={()=>{openProductEditModal(item)}}
               ><CgPen size={20}/></button>
            </div>
         </div>
         <div className="separator"/>
      </>
   );
}
 
export default Purchase;