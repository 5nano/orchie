import React, { useState, useEffect } from 'react';
import './CreateQR.scss';
const QRCode = require('qrcode')
import axios from 'axios';
// It will reuse all styles from PictureInstructions

class CreateQR extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      qrCreated: false,
    }
  }
  render() {
    const handleSubmit = (e) => {
      e.preventDefault();
      const name = e.target[0].value;
      axios.post('/api/qr', { name })
        .then(() => {
          this.setState({ qrCreated: true }, () => {
            const canvas = document.getElementById('canvas')
            
            QRCode.toCanvas(canvas, name, function (error) {
              window.print();
              if (error) console.error(error)
            })
          })
        });
      // props.history.push('/printQR');
    }

    return (
      <div className="Instructions CreateQR">
          <h1> {this.state.qrCreated ? 'Pegale este QR a tu muestra' : 'Ingresa un nombre que identifique a la muestra'} </h1>
  
          {
            this.state.qrCreated ? 
            <canvas id="canvas"></canvas> :
            <form onSubmit={handleSubmit}>
                <input className="name-input" placeholder="Nombre"></input>
  
                <button type="submit">Hecho, crear QR para nueva muestra</button>
            </form>
          }

          {
            this.state.qrCreated &&
            <button onClick={() => this.setState({qrCreated: false})}> Hecho, continuar con otra muestra </button>
          }
      </div>
    );
  }
 
}

export default CreateQR;
