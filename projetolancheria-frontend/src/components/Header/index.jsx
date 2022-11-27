import React from 'react';
import './styles.css'

import {ReactComponent as UserSVG} from '../../assets/UserSVG.svg'

const Header = ({responsiveWidth}) => {
   return ( 
      <div className='header-container'>
         <div className="logo-div">
            <h1 className='logo-word' style={responsiveWidth? {fontSize: 80} : {fontSize: 40}}>LANCHERIA</h1>
         </div>
         <button className="user-icon">
            <UserSVG fill='white'/>
         </button>
      </div>
    );
}
 
export default Header;