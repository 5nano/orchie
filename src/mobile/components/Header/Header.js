import * as React from 'react';
import BushService from '../../../services/bush';

function Header (props) {

    const logout = () => {
        BushService.post('/logout')
                   .then((response)=>{
                        document.cookie = `user=;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`; // Logout
                        window.location.href = '/login';
                })
    }
    return(
        <div className="header-container">
            <div className="header-wrapper">
                <div className="header-logo">

                </div>
                <div className="header-options">
                    <a onClick={()=>logout()}>
                        Cerrar Sesion
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Header;
