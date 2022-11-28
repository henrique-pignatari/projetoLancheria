import React from 'react';
import Modal from '../Modal';

import './styles.css'

const ProductEditModal = ({
   setEditModalShow,
   title,
   cancelButtonText,
   confirmButtonText,
   handleModalConfirm,
   item,
}) => {

   return ( 
      <Modal
         setModalShow={setEditModalShow}
         title={title}
         cancelButtonText = {cancelButtonText}
         confirmButtonText = {confirmButtonText}
         handleModalConfirm = {handleModalConfirm}
      >   
      </Modal>
   );
}
 
export default ProductEditModal;