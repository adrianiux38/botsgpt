//importar react

import {React}  from 'react'
import "./Header.css"
import Logo from "./assets/logo.png"

//Componente Funcional 
//type = button-long-text

export const Header = () => {
    return(
        <div className='navbar'>
                <div className="container-lg flex flexRow justifySpace">
                    <div className='contNav'>
                        <img id="logo" src={Logo} alt="logo" />
                        
                    </div>
                    
                </div>
        </div>
    );
}