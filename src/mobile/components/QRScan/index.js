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
            <div className="qr-scan-container">
                <div className="qr-scan-wrapper">
                    <div className="qr-scan-title">
                        Escaneá el QR asociado al experimento
                    </div>
                    {<QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ 'width': '100%'}}
                    />}    
                    <h4>Atención!</h4>    
                    <p>Si el experimento aún no tiene un QR asociado, dirigite a la app de escritorio para imprimirla</p>
             </div>
            </div>
        );
    }

}

export default QrScan;
