import React from 'react';

import './styles.css'

const Modal = (
   { 
      children, 
      setModalShow, 
      title, 
      confirmButtonText, 
      cancelButtonText,
      handleModalConfirm,

   }) => {
   return ( 
      <div className='modal-background'>
         <div className="modal-container">
            <button
            className='modal-close-button'
               onClick={()=>{setModalShow(false)}}
            >X</button>
            <div className="title">
               <h1>{title}</h1>
            </div>
            {children}
            
            <div className="action-buttons">
               <button 
                  onClick={()=>{
                     setModalShow(false);
                     handleModalConfirm();
                  }}
                  className='modal-button-confirm'
               >
                  {confirmButtonText}
               </button>

               <button 
                  onClick={()=>{setModalShow(false)}}
                  className='modal-button-cancel'
               >
                  {cancelButtonText}
               </button>
            </div>
         </div>
      </div>
   );
}
 
export default Modal;