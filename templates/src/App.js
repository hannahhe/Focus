import "babel-polyfill";
import $ from "jquery";

import React from "react";
import ReactDOM from "react-dom";
import Clipboard from "clipboard";

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
