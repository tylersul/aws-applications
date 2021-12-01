import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false
  }

  onFileChange = event => {
    this.setState({selectedFile: event.target.files[0]});
  }

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "demo file",
      this.state.selectedFile,
      this.state.selectedFile.name
    )

    // call api
    // console.log(formData);
    // this.setState({selectedFile: null});
    // this.setState({fileUploadedSuccessfully: true});
    axios.post("https://gwi8uf8cu2.execute-api.us-east-1.amazonaws.com/prod/file-upload", formData).then(() => {
      this.setState({selectedFile: null});
      this.setState({fileUploadedSuccessfully: true});
    })
  }

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>Last Modified: {" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      )
    } else if (this.state.fileUploadedSuccessfully) {
      return (
        <div>
          <br />
          <h4>File successfully uploaded</h4>
        </div>
      )
    } else {
      return (
        <div>
          <br />
          <h4>Choose a file to upload:</h4>
        </div>
      )
    }
  }

  render() {
    return (
      <div class="container">
        <h2>Welcome to the File Upload System</h2>
        <h3>File uploader with React and a serverless AWS API</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Upload
          </button>
        </div>
        {this.fileData()}
      </div>
    )
  }
}
export default App;
