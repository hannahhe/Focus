import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
//import Header from "../../static/img/1.png";
import Select from 'react-select';
import { Dropdown, Button, NavItem, Modal, Row, Col, Input } from "react-materialize";
import { scaryAnimals } from "./categories";
import "./WebAudioRecorder.min.js";
import ReactDOM from "react-dom";
import "babel-polyfill";
import $ from "jquery";


class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.formData = new FormData();
   }
  getCat = (e) => { //get the input text
    let cat = e.target.value;
    this.state.cat = cat;
    console.log('category', cat);
    this.state.formData.set('cat', this.state.cat);
    console.log('formData', this.state.formData.get('cat'));
  }

  sendCategoryInfo = () => {
      fetch('/cat', { //http put request
        method: 'POST',
        body: this.state.formData
      })
    //  .then(response => response.json()) //get back a json
      //.catch(error => console.error(error)) //error handling
      .then(response => {
        //this.state.cat = response.offT;
        //console.log(this.state.cat);
        //console.log(this.state);
        this.forceUpdate();
      }); //if the json is valid
    }

  render() {
    return (
      <div>
        <h1 className='title'>focus</h1>
        <Row>
        <Input placeholder="Text Here" defaultValue="" s={12} onChange = {this.getCat} />
         <Button waves='light' onClick = {this.sendCategoryInfo}>Submit</Button>
        </Row>
        <footer className = 'footer'> By Hannah He </footer>
      </div>
    );
  }
}

class RecordButton extends React.Component {

  constructor(props){
    super(props);
    this.state = {isRecording: false, text: "start"};

    this.handleClick = this.handleClick.bind(this);
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

  /*componentDidMount() {
    navigator.mediaDevices.getUserMedia({ //get access to user's microphone/cam
      'audio': true,
      'video': false, //don't need cam
    } ).then((stream) => {
      const audioContext = new AudioContext(); //OBJECT
      const input = audioContext.createMediaStreamSource(stream); //Get a stream source
      const recorder = new WebAudioRecorder(input, { //from library
        'workerDir': '/static/', //1. provides audio reorder and access
        'numChannels': 1, //want monosound and not stero
      }); //CHROME AND FIREFOX HAPPY
      recorder.onComplete = (rec, blob) => {  //what to do when finished recording?
        const url = '/speechdata';
        fetch(url, {
          method: 'POST', //SHOVE TO SERVER
          body: blob,
        });
      };
      recorder.startRecording();
      setInterval(() => { recorder.finishRecording(); recorder.startRecording();}, 5000);
      //setTimeout(() => { recorder.finishRecording(); }, 2000); //set how long it's recording
    }).catch((err) => {
      console.log("There was an error", err); //WHAT HAPPENS WHEN YOU'RE MICLESS?
    });
  }*/

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedOption: null,
    }
  }
  handleChange = (selectedOption) => {
    this.setState(state => ({
      selectedOption: selectedOption.label
    }));
    var option = new FormData();
    option.set('cat', selectedOption.label);
    fetch('/cat', { //http put request
      method: 'POST',
      body: option
    })
    .then(response => {
      //this.state.cat = response.offT;
      //console.log(this.state.cat);
      //console.log(this.state);
      this.forceUpdate();
    })
    .catch(error => console.error(error)); //if the json is valid
    console.log(`Option selected:`, selectedOption.label);

  }
  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ //get access to user's microphone/cam
      'audio': true,
      'video': false, //don't need cam
    } ).then((stream) => {
      const audioContext = new AudioContext(); //OBJECT
      const input = audioContext.createMediaStreamSource(stream); //Get a stream source
      const recorder = new WebAudioRecorder(input, { //from library
        'workerDir': '/static/', //1. provides audio reorder and access
        'numChannels': 1, //want monosound and not stero
      }); //CHROME AND FIREFOX HAPPY
      recorder.onComplete = (rec, blob) => {  //what to do when finished recording?
        const url = '/speechdata';
        fetch(url, {
          method: 'POST', //SHOVE TO SERVER
          body: blob,
        })
        .then(response => response.json())
        .catch(error => console.error(error))
        .then(response => {
          this.state.onTopic = response.offT;
        })
        .catch();
      };
      recorder.startRecording();
      setInterval(() => { recorder.finishRecording(); recorder.startRecording();}, 5000);
      //setTimeout(() => { recorder.finishRecording(); }, 2000); //set how long it's recording
    }).catch((err) => {
      console.log("There was an error", err); //WHAT HAPPENS WHEN YOU'RE MICLESS?
    });
  }
  render() {
    const { selectedOption, onTopic } = this.state;
    this.state.onTopic = "on";
    return (
      <div className="App">
        <img src={'../../static/img/1.png'}/>
        <Row><ul>
          <li className = "topicText">What do you want to talk about?</li>
          </ul>
          <Select value={selectedOption}
            onChange={this.handleChange}
            options={scaryAnimals}/>
        </Row>
        <div>
          {selectedOption != null ?
            <RecordButton />:"" }
        </div>
        <p>You're {this.state.onTopic ? "on" : "off"} topic.</p>
      </div>
    );
  }
}

export default App;
