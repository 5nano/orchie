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
            this.props.setCurrentExperiment(data);
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
            <div className="PictureInstructions Camera">
                <h1>Escanea el QR de la muestra</h1>
        
                <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                />         
        
            {
                this.state.result &&
                <p>{this.state.result}</p>
            }
            </div>
        );
    }

}

export default Camera;
