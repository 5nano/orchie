import React, { useState } from 'react';
import './Camera.scss';

class Camera extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tookPicture: false,
            loading: false,
            sent: false,
            bulmapsaurPayload: null,
        }
        this.takePicture = this.takePicture.bind(this);
        this.resetCamera = this.resetCamera.bind(this);
        this.captureVideo = this.captureVideo.bind(this);
        this.sendPicture = this.sendPicture.bind(this);
        this.nextPlant = this.nextPlant.bind(this);
    }


    captureVideo() {

        navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:"environment"}})
            .then(gotMedia.bind(this))
            .catch(error => {
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
                    tookPicture: true
                }, () => {
                    this.refs.camera.src = URL.createObjectURL(blob);
                    this.refs.camera.onload = () => { URL.revokeObjectURL(this.src); }
                    this.handleImageToBase64(blob);
                })
            })
    }

    handleImageToBase64(file) {
        let reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
            console.log("Cargando info con props ",this.props)
            const idAssay = this.props.testInfo.split('-')[0];
            const idExperiment = this.props.testInfo.split('-')[1];
            let bulmaPayload = {
                idAssay: idAssay,
                idExperiment: idExperiment,
                base64: reader.result.slice(reader.result.indexOf(",") + 1)
            };
            console.log("Bulmapsaur payload", bulmaPayload)
            this.setState({ bulmapsaurPayload: bulmaPayload })

        }
    }

    handleFileUpload(){

        setTimeout(() => {
            this.setState({
                loading: false,
                sent: true,
            })
        }, 1400)
        fetch('http://35.188.202.169:8443/bulmapsaur/api/images', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: this.state.bulmapsaurPayload
            })
        .then(response => console.log(response))
        .catch(error => console.log(error))
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
            },
            this.handleFileUpload)
    }


    nextPlant() {
        this.props.history.replace('/steps-use-plane')
    }

    render() {

        if (this.state.sent) {
            return (
                <div className="PictureInstructions Camera Success">
                    <h1>Se guardaron las medidas correctamente</h1>
                    <button onClick={this.nextPlant}> Próxima muestra </button> :
                </div>
            )
        }
        console.log(this.state)

        return (

            <div className="PictureInstructions Camera Plant">
                {
                    !this.state.tookPicture ?
                    <h1>
                        Sacá la foto de
                        de la muestra
                    </h1> :
                    <h1>Se ve bien la foto?</h1>
                }


                {
                    !this.state.tookPicture &&
                    <video autoPlay className="live-camera"></video>
                }

                {
                    this.state.tookPicture &&
                    <img ref="camera" className="photo" />
                }

                {
                    this.state.loading ?

                    <div className="loading">'Enviando foto...'</div> :

                        !this.state.tookPicture ?

                        <button onClick={this.takePicture}> Sacar Foto </button> :

                        [
                            <button onClick={this.sendPicture}>Enviar Foto </button>,
                            <button onClick={this.resetCamera}> Volver a Sacar </button>
                        ]

                }


            </div>
        );
    }

}

export default Camera;
