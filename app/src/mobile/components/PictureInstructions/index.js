import React, { useState } from 'react';
import './PictureInstructions.scss';
import InstructionsPlant from './InstructionsPlant3.png';
import Button from '@material-ui/core/Button';


function PictureInstructions(props) {
    const handleClick = (e) => {
        e.preventDefault();
        props.history.push('/qr-scan');
    }

  return (
    <div className="PictureInstructions">
        <h1>Colocá el plano detrás de la planta que vas a medir</h1>

        <div className="plane-dot top"/>
        <div className="plane">
            <img src={InstructionsPlant} />
        </div>
        <div className="plane-dot bottom"/>

        <Button onClick={handleClick}>Entendido</Button>

    </div>
  );
}

export default PictureInstructions;
