import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import "babel-polyfill";
import $ from "jquery";

import ReactDOM from "react-dom";
import Clipboard from "clipboard";

import { Dropdown, Button, NavItem, Modal, Row, Col, Input } from "react-materialize";

export class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.formData = new FormData();
   }
   onChange = (e, val) => { //defines a function, onChange which takes an event and value and takes value and stores it in something
     this.sate.formData.set('Text', 'Hello World')
     this.forceUpdate();
   }
   onChangeField = field => {
       let onChangeSpecific = (e) => {
         let value = e.target.value;
         this.state.formData.set(field, value);
       }
       return onChangeSpecific
   }

  getText = (e) => { //get the input text
    let text = e.target.value;
    this.state.text = text;
    console.log('input text', text);
    this.state.formData.set('Text', this.state.text);
  }
  /*sendTextInfo = () => {
    fetch('/text', { //http put request
      method: 'PUT',
      body: this.state.formData
    })
    .then(response => response.json()) //get back a json
    .catch(error => console.error(error)) //error handling
    //.then(response => {
      //this.state.laTeX = response.latex;
      //console.log(this.state.laTeX);
      //console.log(this.state);
      this.forceUpdate();
    }); //if the json is valid*/
  //}


  render() {
    return (
      <div>
        <Row>
        <Col s={1}>Please input your Text:</Col>
        <Col s={5}><Input placeholder="Text" defaultValue='' s={6} onChange ={this.onChangeField('Text')}/></Col>
        </Row>
      </div>
    );
  }
}

$(document).ready(() => {
  ReactDOM.render(
    <div>
      <h1 className='title'>focus</h1>
      <UserInput />
      <footer className = 'footer'> By Hannah He </footer>
    </div>,
      //<Hannah number={1} />
      //<Hannah number={2} />
    //</div>,
    document.getElementById("root")
  );
});
