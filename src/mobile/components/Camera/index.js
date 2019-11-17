import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Loader from '../Utilities/Loader/Loader';
import { Snackbar } from '@material-ui/core';

import BushService from '../../../services/bush';

import MySnackbarContentWrapper from '../Feedback/MySnackbarContentWrapper';
import Plant from '../../../assets/images/plant.png';
class Camera extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tookPicture: false,
            loading: false,
            sent: false,
            bulmapsaurPayload: null,
            sendError: false  ,
            blob: null,
            feedback:false
        }
        this.takePicture = this.takePicture.bind(this);
        this.resetCamera = this.resetCamera.bind(this);
        this.captureVideo = this.captureVideo.bind(this);
        this.sendPicture = this.sendPicture.bind(this);
        this.nextPlant = this.nextPlant.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
        let testInfo = this.props.match.params.experimentId;
        reader.readAsDataURL(file)

        reader.onload = () => {
            const idAssay = testInfo.split('-')[0];
            const idExperiment = testInfo.split('-')[1];
            let bulmaPayload = {
                idAssay: idAssay,
                idExperiment: idExperiment,
                base64: reader.result.slice(reader.result.indexOf(",") + 1)
            };
            this.setState({ bulmapsaurPayload: bulmaPayload })
        }
    }

    handleFileUpload() {
        
        BushService.post('/images',this.state.bulmapsaurPayload)
                    .then(() =>  this.setState({ sent: true, sendError: true , blob: null,feedback:true}))
                     .catch(error => this.setState({ sent: false, loading: false, sendError: true,feedback:true }))
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
        this.props.history.replace('/qr-scan')
    }

    handleClose(){
        this.setState({feedback:false})
    }

    render() {

        if (this.state.sent) {
            return (
                <div className="layout-container">
                    <div className="layout-wrapper">

                        <div className="next-plant">
                            <Button variant="outlined" 
                                    onClick={this.nextPlant}> 
                                Próxima planta 
                            </Button>

                            <img src={Plant}/>
                        </div>
                    
                        <Snackbar 
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            open={this.state.feedback}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            >
                                <MySnackbarContentWrapper
                                onClose={this.handleClose}
                                variant="success"
                                message="La imagen ha sido enviada exitosamente!"
                                />
                        </Snackbar>
                    </div>
                </div>
            )
        }

        if (this.state.sendError) {
        
            return (
                <div className="layout-container">
                    <div className="layout-wrapper">
                   
                    {
                        <img src={URL.createObjectURL(this.state.blob)} className="photo" />
                    }
                    {
                        <Button onClick={this.sendPicture}> Enviar fotografía </Button>
                    }

                        <Snackbar 
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            open={this.state.feedback}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            >
                                <MySnackbarContentWrapper
                                onClose={this.handleClose}
                                variant="error"
                                message="Perdón, ocurrió un problema al subir la imagen. Por favor, intente nuevamente"
                                />
                        </Snackbar>
                    
                    </div>
                </div>
            )
        }

        return (

            <div className="layout-container">
                <div className="layout-wrapper">

                <div className="layout-title">
                    {
                        !this.state.tookPicture ?
                        'Toma la foto de la planta'
                        :
                        '¿Se ve bien la fotografía?'
                    }
                </div>

                {
                    !this.state.tookPicture &&
                    <video autoPlay className="camera"></video>
                }

                {
                    this.state.tookPicture &&
                    <img ref="camera" className="camera" />
                }

                {
                    this.state.loading ?

                    <Loader/>
                    :
                    !this.state.tookPicture ?

                        <label htmlFor="icon-button-file">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={this.takePicture}
                            size="medium"
                            style={
                                {'backgroundColor': 'white',
                                'margin': 'auto',
                                'display': 'table',
                                'marginTop': '5px'}
                            }
                          >
                            <PhotoCamera />
                          </IconButton>
                          </label> 
                          :
                        <ButtonGroup size="large">
                              <Button onClick={this.sendPicture}>Enviar fotografía</Button>
                              <Button onClick={this.resetCamera}>Nueva fotografía</Button>
                        </ButtonGroup>

                }

                </div>
            </div>
        );
    }

}

export default Camera;
