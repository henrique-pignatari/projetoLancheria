import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/app';
import ItemList from '../../components/ItemList';

import './styles.css'
import Modal from '../../components/Modal';

const Purchase = () => {
   const {
      purchase, 
      addPurchase, 
      setPurchaseProducts, 
      getProducts
   } = useContext(AppContext);

   const [modalShow,setModalShow] = useState(false);
   const [personalizing,setPersonalizing] = useState(false);
   const [DbProducts, setDbProducts] = useState([]);

   const handleProductAddButton = () =>{
      // addPurchase({
      //    description: "X-Teste",
      //    id: '1',
      //    materials:[
      //       {
      //          id: '1',
      //          ingredient: {
      //             id: '1',
      //             description: 'Ovo',
      //             price: 0.50
      //          },
      //          quantity: 1
      //       },
      //       {
      //          id: '2',
      //          ingredient: {
      //             id: '2',
      //             description: 'Hamburguer',
      //             price: 3
      //          },
      //          quantity: 3
      //       }
      //    ]
      // })
      
      if(DbProducts.length < 1){
         fetchProducts().then((response)=>{
            setDbProducts(response);
         });
      }

      setModalShow(true);
   }

   useEffect(()=>{
      let storedPurchase = JSON.parse(localStorage.getItem("Products"));
      if(!storedPurchase){
         storedPurchase = []
      }

      setPurchaseProducts(storedPurchase);
   },[])

   
   const fetchProducts = async () => {
      const products = await getProducts();
      return products;
   }

   const handleProductConfirm = () =>{

   }

   return (
      <>
      {modalShow &&
         <Modal
            setModalShow={setModalShow}
            title={'Escolha seu lanche:'}
            confirmButtonText ={'SIM!'}
            cancelButtonText = {'NÃO'}
            handleModalConfirm = {handleProductConfirm}
         >
            {
               DbProducts.map(product => (
                  <button
                     key={product.id}
                  >
                     PENIS
                  </button>
               ))
            }
         </Modal>
      }
      
         <div className="purchase-container">
            <div className="content">
               <div className="frame">
                  <div className="frame-container">   
                     <h1 className='frame-header'>
                        FAÇA SEU PEDIDO:
                     </h1>
                     <ItemList items={purchase.purchaseProducts}/>
                  </div>
                  <button
                     onClick={handleProductAddButton}
                     className='button-add-product'
                  >ADICIONAR LANCHE</button>
               </div>
            </div>
         </div> 
      </>
   );
}
 
export default Purchase;