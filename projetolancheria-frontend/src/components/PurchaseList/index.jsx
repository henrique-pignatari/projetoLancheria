import React, { useContext } from 'react';
import uuid from 'react-uuid';

import Purchase from '../Purchase';

import './styles.css'

const PurchaseList = ({items,openProductEditModal}) => {
   return ( 
      <div className="list-container">
         {
         items.map(item => (
           <Purchase 
               key={uuid()} 
               item={item}
               openProductEditModal={openProductEditModal}
            /> 
         ))}
      </div>
   );
}
 
export default PurchaseList;