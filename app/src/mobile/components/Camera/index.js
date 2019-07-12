import React, { useState } from 'react';
import './Camera.scss';

class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tookPicture: false,
            loading: false,
            sent: false,
            photoInfo: null,
        };
        this.takePicture = this.takePicture.bind(this);
        this.resetCamera = this.resetCamera.bind(this);
        this.captureVideo = this.captureVideo.bind(this);
        this.sendPicture = this.sendPicture.bind(this);
        this.nextPlant = this.nextPlant.bind(this);
    }

    captureVideo() {
        navigator.mediaDevices.getUserMedia({audio: false, video: { facingMode: { exact: "environment" } }})
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

    handleImageToBase64(file){
        let reader = new FileReader()
        
        reader.readAsDataURL(file)
        
        reader.onload = () => {
            let photoInfo = {
                name: file.name,
                type: file.type,
                size: file.size,
                base64: reader.result,
                file:file,
            };
        
        this.setState({ photoInfo: photoInfo }) 
        console.log(photoInfo)
        }
    }

    handleFileUpload(){
     
        setTimeout(() => {
            this.setState({
                loading: false,
                sent: true,
            })
        }, 1400)

        fetch('https://my-json-server.typicode.com/typicode/demo/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.photoInfo.name,
                size: this.state.photoInfo.size,
                base64: this.state.photoInfo.base64,
                file: this.state.photoInfo.file,
            })
            })
        .then(response => console.log(response))

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
    )}

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
            <div className="PictureInstructions Camera Plant">
                {
                    !this.state.tookPicture ?
                    <h1>Sacá la foto de "{this.props.currentExperiment}"</h1> :
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
                    this.state.loading ? <div className="loading">'Enviando foto...'</div> :

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
