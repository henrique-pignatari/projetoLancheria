import React from 'react';

import './styles.css'

import TwitterSVG from '../../assets/twitterSVG.svg'
import WhatsAppSVG from '../../assets/whatsappSVG.svg'
import InstagramSVG from '../../assets/instagramSVG.svg'

const Footer = () => {
return (  
   <div className='footer-container'>
      <div className="footer-links">
         <span>Quem somos?</span>
         <span>Contato</span>
         <span>Endereço</span>
      </div>
      
      <div className="logos">
         <img src={TwitterSVG}/>
         <img src={WhatsAppSVG}/>
         <img src={InstagramSVG}/>
      </div>
   </div>
);
}

export default Footer;