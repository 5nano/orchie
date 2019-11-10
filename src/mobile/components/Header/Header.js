import * as React from 'react';
import BushService from '../../../services/bush';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import logo from '../../../assets/images/nanivo-logo.png';
import help from '../../../assets/images/help.jpg';
import { Drawer } from '@material-ui/core';
function Header (props) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [helper,setHelper] = React.useState(false);

    const logout = () => {
        BushService.post('/logout')
                   .then((response)=>{
                        document.cookie = `user=;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`; // Logout
                        window.location.href = '/login';
                })
    }

    const openMenu = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchorEl(null)
    }

    const showHelper = () => {
        setHelper(true)
    }

    const closeHelper = () => {
        setHelper(false)
    }
    return(
        <div id="header-container" className="header-container">
            <div className="header-wrapper">
                <div className="header-logo">
                    <img src={logo}/>
                </div>
                <div className="header-options">
                    <MenuIcon onClick={(e)=>openMenu(e)}/>
                    <Menu
                        id='menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}>
                        <MenuItem onClick={()=>logout()}>Cerrar Sesion</MenuItem>
                        <MenuItem onClick={()=>showHelper()}>Ayuda</MenuItem>
                    </Menu>
                </div>
            </div>
            <Drawer anchor="top" open={helper} onClose={()=>closeHelper}>
                    <img onClick={()=>closeHelper()} src={help}/>
            </Drawer>
        </div>
    )
}

export default Header;
