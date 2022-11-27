import React from 'react';

import './styles.css'

import TwitterSVG from '../../assets/twitterSVG.svg'
import WhatsAppSVG from '../../assets/whatsappSVG.svg'
import InstagramSVG from '../../assets/instagramSVG.svg'

const Footer = () => {
return (  
   <div className='footer-container'>
      <span>Quem somos?</span>
      <span>Contato</span>
      <span>Endereço</span>
      
      <div className="logos">
         <img src={TwitterSVG} width={80}/>
         <img src={WhatsAppSVG}/>
         <img src={InstagramSVG}/>
      </div>
   </div>
);
}

export default Footer;