import React, { useContext } from 'react';

import { CgPen, CgClose} from "react-icons/cg";
import { AppContext } from '../../contexts/app';

import './styles.css'

const Item = ({item}) => {
   const {deletePurchase} = useContext(AppContext);

   const {responsiveWidth} = useContext(AppContext)
   
   return (  
      <>
         <div className="item-container"> 
            <div className="item-description-container">
               <h1 style={!responsiveWidth? {fontSize: 20}: {}} className='item-description'>{item.description}</h1>
               <span className='item-price'><span>R$ </span>{20.00.toFixed(2)}</span>
            </div>
            <div className="item-options">
               <button
                  onClick={()=>{deletePurchase(item.id)}}
               ><CgClose size={28}/></button>
               <button><CgPen size={20}/></button>
            </div>
         </div>
         <div className="separator"/>
      </>
   );
}
 
export default Item;