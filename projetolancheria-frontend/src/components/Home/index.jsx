import React from 'react';
import Header from '../Header';

import HamburguerExplode from '../../assets/hamburguer-explode.png'
import HamburgureNormal from '../../assets/hamburguer.png'

import './styles.css'
import Footer from '../Footer';

const Home = ({responsiveWidth}) => {
   return (
      <>
         <Header responsiveWidth={responsiveWidth}/>
         <div className='home-container'>
            <div className="content">
               <div className='hamburguer-container'>
                  <img src={HamburguerExplode}className='hamburguer' style={!responsiveWidth? {width:300,height:400, alignSelf: 'center'} : {}} />

                  {
                     responsiveWidth?
                        <img src={HamburgureNormal}className='hamburguer'/>
                     :
                     null
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
               <button className='order-button'>FAÇA SEU PEDIDO AGORA MESMO</button>
            </div>
         </div>
         <Footer/>
      </>
   );
}
 
export default Home;