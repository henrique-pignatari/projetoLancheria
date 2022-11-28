import React, { useContext, useState } from 'react';
import './styles.css'
import {CgHome} from "react-icons/cg";

import {ReactComponent as UserSVG} from '../../assets/UserSVG.svg'
import { AppContext } from '../../contexts/app';
import { useNavigate } from 'react-router-dom';

import Modal from '../Modal';

const Header = () => {
   
   const {responsiveWidth} = useContext(AppContext)
   const [modalShow, setModalShow] = useState(false);
   const navigate = useNavigate();

   const handleAdminAccess = () =>{
      navigate('/admin')
   }

   const handleHomeButton = () =>{
      navigate('/');
   }

   return ( 
      <>
         {modalShow && 
            <Modal 
               setModalShow={setModalShow}
               title={'Você realmente é um admin?'}
               confirmButtonText ={'SIM!'}
               cancelButtonText = {'NÃO'}
               handleModalConfirm = {handleAdminAccess}
            >
            </Modal>
         }
         <div className='header-container'>
            <button 
               onClick={handleHomeButton}
               className="home-button"
            >
               <CgHome color='whitesmoke' size={30}/>
            </button>

            <div className="logo-div">
               <h1 className='logo-word' style={responsiveWidth? {fontSize: 80} : {fontSize: 40}}>LANCHERIA</h1>
            </div>
            <button
               onClick={()=>{setModalShow(true)}}
               className="user-icon"
               >
               <UserSVG fill='white'/>
            </button>
         </div>
         
      </>
    );
}
 
export default Header;