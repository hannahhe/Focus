import "babel-polyfill";
import $ from "jquery";

import React from "react";
import ReactDOM from "react-dom";
import Clipboard from "clipboard";
import "./WebAudioRecorder.min.js";

import { Dropdown, Button, NavItem, Modal, Row, Col, Input } from "react-materialize";

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
          });
        };
        recorder.startRecording();
        setInterval(() => { recorder.finishRecording(); recorder.startRecording();}, 5000);
        //setTimeout(() => { recorder.finishRecording(); }, 2000); //set how long it's recording
      }).catch((err) => {
        console.log("There was an error", err); //WHAT HAPPENS WHEN YOU'RE MICLESS?
      });
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

export default UserInput;
