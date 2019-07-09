import React from 'react'
import FileBase64 from 'react-file-base64'
import axios from 'axios'
class ImageRouter extends React.Component{
    constructor(){
        super()
        this.state = {
            files:[],
            fileInfo: null
        };

        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.imageToBase64 = this.imageToBase64.bind(this);
    }

    //Callback
    getFiles(files){
        this.setState({ files: files })
    }

    fileSelectedHandler(event) {
        this.imageToBase64(event.target.files[0])
    }

    imageToBase64(file){
        let reader = new FileReader();
        
        reader.readAsDataURL(file);
        
        reader.onload = () => {
            let fileInfo = {
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1000) + 'kB',
                base64: reader.result,
                file:file,
            };
        
        this.setState({ fileInfo: fileInfo }) ;
        
        }
    }

    fileUploadHandler(){
      axios({
        method: 'post',
        url: 'localhost:8090/bulmapsaur/api/images',
        data: {
          name: this.files
        }
      });
    }

    render (){
        return(
            <div>

        <div className="text-center mt-25">
         <input type="file" onChange= {this.fileSelectedHandler} />
        </div>


        { this.state.fileInfo ?
          <div>
            <h3 className="text-center mt-25">Callback Object</h3>
            <div className="pre-container">
              <pre>{ JSON.stringify(this.state.fileInfo, null, 2) }</pre>
            </div>
          </div>
        : null }

        

      </div>

        )
    }
}

export default ImageRouter