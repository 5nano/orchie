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
      const idAssay = e.target[0].value;
      const idExperiment = e.target[1].value;
      //Genero el qr con lo que luego va a ser la informacion de test y se manda a bulma
      let testInfo = idAssay + '-' + idExperiment;
      axios.post('/api/qr', {testInfo})
        .then(() => {
          this.setState({ qrCreated: true }, () => {
            const canvas = document.getElementById('canvas')
            
            QRCode.toCanvas(canvas, testInfo, function (error) {
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
                
                <div>
                  <label>
                    <input className="name-input" placeholder="IdAssay"></input>

                    <input className="name-input" placeholder="IdExperiment"></input>
                  </label>
                </div>
                
  
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
