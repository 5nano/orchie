import React, { useState } from 'react';
import axios from 'axios';
import './Camera.scss';
import QrReader from 'react-qr-reader'

class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tookPicture: false,
            loading: false,
            sent: false,
        };
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleScan(data) {
        if (data) {
            console.log(data)
            this.props.setCurrentExperiment(1,'Fertilizante para soja',2);
            this.props.history.replace('/camera')
        }
    }

    handleError() {
        this.setState({
            result: null,
        })
    }

    render() {
    
        return (
            <div className="PictureInstructions ">
                <h1>Escanea el QR de la muestra</h1>
                {<QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                />}        
             <p>Si la muestra aún no tiene QR dirigite a la app de escritorio e imprimila</p>
            </div>
        );
    }

}

export default Camera;
