import React, { useState } from 'react';
import './Camera.scss';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


class Camera extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tookPicture: false,
            loading: false,
            sent: false,
            bulmapsaurPayload: null,
            sendError: false  ,
            blob: null
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
                    this.state.blob = blob;
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

    handleFileUpload() {

        fetch('https://nanivo-bush.herokuapp.com/images, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.bulmapsaurPayload)})
        .then(response =>  this.setState({ sent: true, sendError: true , blob: null}))
        .catch(error => this.setState({ sent: false, loading: false, sendError: true }))
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
                    <h1> La imagen ha sido enviada </h1>
                    <Button onClick={this.nextPlant}> Próxima planta </Button> :
                </div>
            )
        }

        if (this.state.sendError) {
        
            return (
                <div className="PictureInstructions Camera Plant">
                    
                    {
                        <h1>
                            Ocurrió un problema mientras enviabamos la fotografía para ser analizada.
                            Por favor intente nuevamente.
                        </h1>
                    }
                    {
                        <img src={URL.createObjectURL(this.state.blob)} className="photo" />
                    }
                    {
                        <Button onClick={this.sendPicture}> Enviar fotografía </Button>
                    }
                    
                </div>
            )
        }

        return (

            <div className="PictureInstructions Camera Plant">
                {
                    !this.state.tookPicture ?
                    <h1>
                        Necesitamos que tomes una fotografía de la planta a analizar
                    </h1> :
                    <h1> ¿Se ve bien la fotografía?</h1>
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

                    <div className="loading">'Enviando fotografía...'</div> :

                        !this.state.tookPicture ?

                        <label htmlFor="icon-button-file">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={this.takePicture}
                            style={
                                {'backgroundColor': 'white',
                                'margin': 'auto',
                                'display': 'table',
                                'marginTop': '5px'}
                            }
                          >
                            <PhotoCamera />
                          </IconButton>
                          </label> :
                        <ButtonGroup >
                              <Button onClick={this.sendPicture}>Enviar fotografía</Button>
                              <Button onClick={this.resetCamera}>Nueva fotografía</Button>
                        </ButtonGroup>

                }


            </div>
        );
    }

}

export default Camera;
