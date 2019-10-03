import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

// It will reuse all styles from PictureInstructions

function PrintInstructions(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.history.push('/steps-use-plane');
  }

  return (
    <div className="PictureInstructions">
        <h1>Primero imprimí el plano desde la app de escritorio</h1>

        <div className="plane-dot top"/>
        <div className="plane" />
        <div className="plane-dot bottom"/>


        <Button onClick={handleClick}>Hecho, siguiente paso</Button>
    </div>
  );
}

export default PrintInstructions;
