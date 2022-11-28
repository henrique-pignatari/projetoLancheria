import React, { useContext } from 'react';
import { AppContext } from '../../contexts/app';

import Item from '../Item';

import './styles.css'

const ItemList = ({items}) => {
   return ( 
      <div className="list-container">
         {
         items.length < 1?
         <h1 style={{color: 'white'}}>ADICIONE SEU PRIMEIRO LANCHE!</h1>
         :
         items.map(item => (
           <Item key={item.id} item={item}/> 
         ))}
      </div>
   );
}
 
export default ItemList;