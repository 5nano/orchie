import * as React from 'react';
import BushService from '../../../services/bush';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import logo from '../../../assets/images/nanivo-logo.png';
function Header (props) {

    const [anchorEl, setAnchorEl] = React.useState(null);

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

    const showHelp = () => {

    }
    return(
        <div className="header-container">
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
                        <MenuItem onClick={()=>showHelp()}>Ayuda</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Header;
