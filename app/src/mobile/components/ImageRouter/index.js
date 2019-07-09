import React from 'react'
import FileBase64 from 'react-file-base64'
import axios from 'axios'
class ImageRouter extends React.Component{
    constructor(){
        super()
        this.state = {
            files:[],
            selectedFile: null
        };

        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.getFiles = this.getFiles.bind(this);
    }

    //Callback
    getFiles(files){
        this.setState({ files: files })
    }

    fileSelectedHandler(event) {
        this.setState({
         selectedFile: event.target.files[0]
        })
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
          <FileBase64
            multiple={ true }
            onDone={ this.getFiles.bind(this) } />
        </div>


        { this.state.files.length != 0 ?
          <div>
            <h3 className="text-center mt-25">Callback Object</h3>
            <div className="pre-container">
              <pre>{ JSON.stringify(this.state.files, null, 2) }</pre>
            </div>
          </div>
        : null }

        <button onClick={this.fileUploadHandler}>Upload</button>

      </div>

        )
    }
}

export default ImageRouter