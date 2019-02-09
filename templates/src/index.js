import "babel-polyfill";
import $ from "jquery";

import React from "react";
import ReactDOM from "react-dom";
import Clipboard from "clipboard";

import { Dropdown, Button, NavItem, Modal, Row, Col, Input } from "react-materialize";

import Hannah from "./hannah";

/*
// uncool way to do it
function Blurb() {
  return <p>Welcome! Blah blah</p>
}

// cool alternative way to do it
const Blurb = () => {
  return <p>Welcome! Blah blah</p>;
}
*/
const clipboardRef = elem => {
  if (elem) { new Clipboard(elem) }
};

const Welcome = () => ( //make welcome blurb
  <p>Welcome!</p>
);



class UserInput extends React.Component {
  //define constructor here
  constructor(props) {
    super(props);
    this.state = {};
    this.state.formData = new FormData();
  }

  onChange = (e, val) => { //defines a function, onChange which takes an event and value and takes value and stores it in something
    this.state.graph_mode = val; //storing
    if (val == 'Function') {
      this.state.formData.set('D1', -10);
      this.state.formData.set('D2', 10);
      this.state.formData.set('X1', -10);
      this.state.formData.set('X2', 10);
      this.state.formData.set('Y1', -10);
      this.state.formData.set('Y2', 10);
    }
    this.forceUpdate();
  }

  onChangeField = field => {
      let onChangeSpecific = (e) => {
        let value = e.target.value;
        this.state.formData.set(field, value);
      }
      return onChangeSpecific
  }


  getUploadedFileName = (e) => {  //get the file
    let files = e.target.files,
        value = e.target.value;

    this.state.formData.set('GraphImage', files[0]);
    this.state.formData.set('GraphType', this.state.graph_mode);
  }

  getNumberOfEdges = (e) => {  //get the number of edges
    let edges = e.target.value;
    this.state.num_edges = edges;


    this.state.formData.set('NumEdges', this.state.num_edges);
    this.state.formData.set('GraphType', this.state.graph_mode);

  }


  getFunction = (e) => {  //get the number of edges
    let func = e.target.value;
    this.state.func = func;

    console.log('what', func);

    this.state.formData.set('Function', this.state.func);
    this.state.formData.set('GraphType', this.state.graph_mode);
  }

  sendGraphInfo = () => {
    fetch('/graph', { //http put request
      method: 'PUT',
      body: this.state.formData
    })
    .then(response => response.json()) //get back a json
    .catch(error => console.error(error)) //error handling
    .then(response => {
      this.state.laTeX = response.latex;
      console.log(this.state.laTeX);
      console.log(this.state);
      this.forceUpdate();
    }); //if the json is valid
  }

  render() {
    return (
      <div>
        <Row>
         <ul>
          <li>Please select the type of graph you would like to tikzify:</li>
         </ul>
          <Input s={12} type='select' label="Pick your graph type..." defaultValue='1'
            onChange={ this.onChange }>
            <option value='1'>Select...</option>
            <option value='Scatter Plot'>Scatter Plot</option>
            <option value='Graph Theory'>Graph Theory</option>
            <option value='Function'>Function</option>
          </Input>
        </Row>
        {
          (this.state.graph_mode && (this.state.graph_mode == 'Scatter Plot')) && (
            <Row>
              <ul>
               <li>Please upload your graph file:</li>
              </ul>
             <Input type="file" label="Upload File" s={12} onChange={this.getUploadedFileName} />
              <Button waves='light' onClick = {this.sendGraphInfo}>Submit</Button>
            </Row>
          )
        }
        {
          (this.state.graph_mode && (this.state.graph_mode == 'Graph Theory')) && (
            <Row>
              <ul>
               <li>Please upload your graph file:</li>
              </ul>
             <Input type="file" label="Upload File" s={12} onChange={this.getUploadedFileName} />
             <Input type="number" label="Number of Edges" s={12} onChange = {this.getNumberOfEdges} />
              <Button waves='light' onClick = {this.sendGraphInfo}>Submit</Button>
            </Row>
          )
        }
        {
          (this.state.graph_mode && (this.state.graph_mode == 'Function')) && (
            <Row>
            <p> Note: please import pgfplots as follows: {'\\usepackage{pgfplots}'} in the preamble of your LaTeX document </p>
            <Row>
            <Col s={1}>f(x)=</Col>
            <Col s={11}><Input placeholder="x^2 + abs(x)" s={6} onChange ={this.getFunction}/></Col>
            </Row>
            <Row>
            <Col s={1}>Domain</Col>
            <Col s={5}><Input placeholder="-10" defaultValue='-10' s={6} onChange ={this.onChangeField('D1')}/></Col>
            <Col s={1}>to</Col>
            <Col s={5}><Input placeholder="10" defaultValue='10' s={6} onChange ={this.onChangeField('D2')}/></Col>

            <Col s={1}>Y-Axis Range</Col>
            <Col s={5}><Input placeholder="-10" defaultValue='-10' s={6} onChange ={this.onChangeField('Y1')}/></Col>
            <Col s={1}>to</Col>
            <Col s={5}><Input placeholder="10" defaultValue='10' s={6} onChange ={this.onChangeField('Y2')}/></Col>

            <Col s={1}>X-Axis Range</Col>
            <Col s={5}><Input placeholder="-10" defaultValue='-10' s={6} onChange ={this.onChangeField('X1')}/></Col>
            <Col s={1}>to</Col>
            <Col s={5}><Input placeholder="10" defaultValue='10' s={6} onChange ={this.onChangeField('X2')}/></Col>

            </Row>
              <Button waves='light' onClick = {this.sendGraphInfo}>Submit</Button>
            </Row>
          )
        }
        {
          this.state.laTeX && (
            <Row>
            <ul>
             <li>It's ready! Please copy your LaTeX Code and paste it into your project!</li>
            </ul>
              <Button><i className="fa fa-clipboard" aria-hidden="true" /> <a className = 'white-text' ref={ clipboardRef } data-clipboard-text={this.state.laTeX}>Copy LaTeX</a></Button>
            </Row>
          )
        }

      </div>
    );
  }
}


/*  */
$(document).ready(() => {
  ReactDOM.render(
    <div>
      <h1 className='title'>\Graphikz[ ]</h1>
      <Welcome />
      <UserInput />
      <footer className = 'footer'> By Hannah He </footer>
    </div>,
      //<Hannah number={1} />
      //<Hannah number={2} />
    //</div>,
    document.getElementById("root")
  );
});
