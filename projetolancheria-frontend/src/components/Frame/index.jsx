import React from 'react';

import './styles.css'

const Frame = ({headerText, children}) => {
   return ( 
      <div className="frame">
         <div className="frame-container">   

            <h1 className='frame-header'>
               {headerText}
            </h1>

            {children}
         </div>
      </div>
    );
}
 
export default Frame;