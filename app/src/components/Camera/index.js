import React, { useState } from 'react';
import axios from 'axios';
import './Camera.scss';

class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tookPicture: false,
            loading: false,
            sent: false,
        };
        this.takePicture = this.takePicture.bind(this);
        this.resetCamera = this.resetCamera.bind(this);
        this.captureVideo = this.captureVideo.bind(this);
        this.sendPicture = this.sendPicture.bind(this);
        this.nextPlant = this.nextPlant.bind(this);
    }

    captureVideo() {
        navigator.mediaDevices.getUserMedia({audio: false, video: true})
            .then(gotMedia.bind(this))
            .catch(error => {
                debugger;
                window.alert('Permitile a Chrome acceso a tu cámara')
                throw error;
            })
            .catch(error => console.error('takePhoto() error:', error));

        function gotMedia(mediaStream) {
            console.log(document.querySelector('video'));
            document.querySelector('video').srcObject = mediaStream;
            document.querySelector('video').classList.remove('hidden');

            const mediaStreamTrack = mediaStream.getVideoTracks()[0];
            this.imageCapture = new ImageCapture(mediaStreamTrack);
        }
    }
    componentDidMount() {
        this.captureVideo();
    }

    takePicture() {
        this.imageCapture.takePhoto()
            .then((blob) => {
                this.setState({
                    tookPicture: true,
                }, () => {
                    this.refs.camera.src = URL.createObjectURL(blob);
                    this.refs.camera.onload = () => { URL.revokeObjectURL(this.src); }
                })
            })
    }

    resetCamera() {
        this.setState({
            tookPicture: false,
        }, () => {
            this.captureVideo();
        });
    }

    sendPicture() {
        this.setState({
            loading: true,
        }, () => {
            setTimeout(() => {
                this.setState({
                    loading: false,
                    sent: true,
                })
            }, 1400)
        })
    }

    nextPlant() {
        this.props.history.replace('/steps-use-plane')
    }

    render() {
        if (this.state.sent) {
            return (
                <div className="PictureInstructions Camera">
                    <h1>Se guardaron las medidas correctamente</h1>
                    <button onClick={this.nextPlant}> Próxima muestra </button> : 
                </div>
            )
        }
    
        return (
            <div className="PictureInstructions Camera">
                <h1>Sacá la foto</h1>
        
                {
                    !this.state.tookPicture &&
                    <video autoPlay className="live-camera"></video>
                }

                {
                    this.state.tookPicture &&
                    <img ref="camera" className="photo" />
                }            
        
                {
                    this.state.loading ? <div className="loading">'Enviando foto...'</div> :

                        !this.state.tookPicture ? 
                        <button onClick={this.takePicture}> Sacar Foto </button> : 
                        [
                            <button onClick={this.sendPicture}> Enviar Foto </button>,
                            <button onClick={this.resetCamera}> Volver a Sacar </button>
                        ]
    
                }


            </div>
        );
    }

}

export default Camera;
