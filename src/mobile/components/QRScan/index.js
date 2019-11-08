import React, { useState } from 'react';
import QrReader from 'react-qr-reader'

class QrScan extends React.Component {
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
            this.props.setTestInfo(data);
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
                <h1>Escanea el QR asociado al experimento</h1>
                {<QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ 'width': '90%',
                        'marginLeft': '5%',
                        'marginRight': '5%' }}
                />}        
             <p> Si el experimento aún no tiene QR dirigite a la app de escritorio e imprimila</p>
            </div>
        );
    }

}

export default QrScan;
