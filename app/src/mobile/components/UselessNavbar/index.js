import React, { useState } from 'react';
import './UselessNavbar.scss';
import logo from '../../../assets/images/logo.png';

function UselessNavbar(props) {
    return (
        <div className="useless-navbar">
            <img src={logo} />
            <h1>5NANO</h1>
        </div>
    )
}

export default UselessNavbar;