import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/app';

import './styles.css'

import HamburguerExplode from '../../assets/hamburguer-explode.png'
import HamburgureNormal from '../../assets/hamburguer.png'

const Home = () => {
   const {responsiveWidth,setResponsive} = useContext(AppContext);
   const navigate = useNavigate()

  useEffect(() => { //ADDS EVENT LISTENER TO DETECT WINDOW WIDTH CHANGE
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setResponsive( e.matches ));
  }, []);  
   
   const handlePurchaseClick = () =>{ //HANDLES WITH BUTTON PRESS, LEADS TO THE PURCHASE PAGE
      navigate('/Purchase');
   }

   return (
      <>
         <div className='home-container'>

            <div className="content">

               <div className='hamburguer-container'>
                  <img src={HamburguerExplode}className='hamburguer' style={!responsiveWidth? {width:300,height:400, alignSelf: 'center'} : {}} />

                  {
                     responsiveWidth &&

                     <img src={HamburgureNormal}className='hamburguer'/>
                  }

               </div>

               <div className="frame">
                  <div className="frame-container">   

                     <h1 className='frame-header'>
                        BEM VINDO À LANCHERIA!
                     </h1>

                     <div className="frame-text">
                        <p>Servimos os melhores lanches da cidade!<br/></p>     
                        <p>Venha experimentar você também!<br/></p>         
                        <p>Conheça nosso cardápio fazendo seu pedido!<br/></p>
                        <p>Aproveite nossas imperdiveis promoções!<br/></p>
                        <p>Monte você mesmo seu lanche!<br/></p>
                     </div>

                  </div>
               </div>

            </div>

            <button 
               style={
                  !responsiveWidth? 
                  {fontSize: 15, marginBottom: 90} :
                  {fontSize: 25}
               } 
               className='order-button'
               onClick={handlePurchaseClick}
            >
               FAÇA SEU PEDIDO AGORA MESMO
            </button>
         </div>
      </>
   );
}
 
export default Home;