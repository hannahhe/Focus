import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
//import Header from "../../static/img/1.png";
import Select from 'react-select';
import {Row, Col, Button} from "react-materialize";
import { scaryAnimals } from "./categories";

/*
export class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false
    }

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

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
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
*/
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




class App extends Component {
  state = {
    selectedOption: null,
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption.label);

  }
  render() {
    const { selectedOption } = this.state;
    return (
      <div className="App">
        <img src={'../../static/img/1.png'}/>
        <Row>


          <ul>
          <li>Find your topic category...</li>
          </ul>
          <Select value={selectedOption}
            onChange={this.handleChange}
            options={scaryAnimals}/>
        </Row>
        <div>
          {selectedOption != null ?
            <RecordButton />:"" }
        </div>
      </div>
    );
  }
}

export default App;
