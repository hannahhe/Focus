import React, { Component } from 'react';
import { ReactMic } from 'react-mic';

export class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false
    }
    this.onStop = this.onStop.bind(this);

  }

  startRecording = () => {
    this.setState({
      record: true
    });
  }

  stopRecording = () => {
    this.setState({
      record: false
    });
  }

  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }


  sendAudio(recordedBlob) {
    var fd = new FormData();
    let obj =
    'o' +
    '\nv -0.500000 -0.500000 0.500000' +
    '\nv 0.500000 -0.500000 0.500000' +
    '\nv -0.500000 0.500000 0.500000' +
    '\nvt 0.000000 0.000000' +
    '\nvt 1.000000 0.000000' +
    '\nvt 0.000000 1.000000' +
    '\nvn 0.000000 0.000000 1.000000' +
    '\nf 1/1/1 2/2/1 3/3/1';
    var blob = new Blob([obj])
    fd.append('audio', recordedBlob.blob, "blob");
    console.log(recordedBlob.blob)
    //fd.append('audio', recordedBlob, "blob"); //recordedBlob, "blob"
    //console.log("this is sent to the put request: ", typeof recordedBlob);
    fetch('/processaudio', { //http put request
      method: 'POST',
      body: recordedBlob.blob
    })
    .then(response => response.json()) //get back a json
    .catch(error => console.error(error)) //error handling
    .then(response => {
      console.log(response.category)
      this.forceUpdate();
    }); //if the json is valid
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
    this.sendAudio(recordedBlob);
    /*this.state.formData.set('audio', recordedBlob);
    fetch('/processaudio', { //http put request
      method: 'PUT',
      body: this.state.formData
    })
    .then(response => response.json()) //get back a json
    .catch(error => console.error(error)) //error handling
    .then(response => {
      console.log(response.category)
      this.forceUpdate();
    }); //if the json is valid*/
  }

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>
      </div>
    );
  }
}

class RecordButton extends React.Component {

  constructor(props){
    super(props);
    this.state = {isRecording: false, text: "start"};

    this.handleClick = this.handleClick.bind(this);
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-GB";
    recognition.onresult = function(event) {
      var interim_transcript = '';

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }

      console.log(interim_transcript,final_transcript);
    };
  }

  handleClick() {
    if (this.state.isRecording) {
      this.setState(state => ({
        isRecording: false,
        text: "start"
      }));
    } else {
      this.setState(state => ({
        isRecording: true,
        text: "stop"
      }));
    }

  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Press to {this.state.text} recording.
      </button>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <RecordButton />
        <Example />
      </div>
    );
  }
}

export default App;
