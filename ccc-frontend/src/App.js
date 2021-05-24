//import logo from './logo.svg';
import './App.css';
import React, {Component, useState, useRef, useEffect} from 'react'; //import to make component classes
import axios from 'axios'; //import to use axios package --> for http requests

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css'; //mapbox
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX1;

// function TestHeader(props){
//   return <h1>{props.name}</h1>
// }

// This is for a button which when clicked, outputs info on a respective twitter analysis scenario
class ScenarioButton extends Component {
  constructor(props){ //constructor
    super(props);
    this.doRequest = this.doRequest.bind(this);
  }
  
  //state variables for the class
  state = {
    result: null, //result of the http GET request
    isActive: false //boolean for status of whether button is active or inactive (to hide/show info)
  };

  //functions to change state of button of being on/off
  handleShow = () => {
    this.setState({isActive: true});
  }
  handleHide = () => {
    this.setState({isActive: false})
  }

  doRequest(){
    //this function executes when button being clicked
    //alert('Hello there o7');

    //https://attacomsian.com/blog/http-requests-axios 
    //requests with parameters. do axios.get("__url__" + this.props.queryParam), then pass in the prop at instantiation

    //axios.get is a promise that something will come back. then() captures received info and maps to state
    axios.get("https://jsonplaceholder.typicode.com/users").then(resp => {
      console.log(resp.data);
      this.setState({result:JSON.stringify(resp.data)});
      this.handleShow();
    });
  }

  render() {
    //renders content hidden within button depending on whether button is on/off (i.e. inactive/active)
    if (this.state.isActive){
      return (
        <div>
          <button onClick={this.handleHide}>
            Hide {this.props.name}
          </button>
          {/* <p style={{fontSize : '10px'}}>{this.state.result}</p> */}
          <br></br>
          {/* this next line displays an entire MapBox component! */}
          <Map1></Map1>
        </div>
      )
    } else /* isActive == false */ {
      return (
        <div>
          <button onClick={this.doRequest}>
            Show {this.props.name}
          </button>
        </div>
      )
    }
  }
}

class Map1 extends Component {

  constructor(props){
    //sets up the maps default state
    super(props);
    this.state = {
      lng: 135.542630,
      lat: -27.530812,
      zoom: 3.89
    };
    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
    container: this.mapContainer.current,
    style: 'mapbox://styles/mawni/ckp1cfea12pjg17pcze2jproe',
    // mapbox://styles/mapbox/streets-v11
    center: [lng, lat],
    zoom: zoom
    });
  }

  render(){
    return(
      <div>
        <p>MapBox</p>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    )
  }
}

//the function event for webpage
function App() {
  return (
    <body>     
      <div className="App">
        <nav>
          {/* navbar at top of page */}
          <div class="navbar">
            <h1 class="nav-header">Team 55</h1>
            <div class="nav-links">
              <ul>
                {/* hrefs are IDs for the sections */}
                <li><a href="#home">Home</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#results">Results</a></li>
                <li><a href="https://github.com/mawni/CityAnalytics">GitHub</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <br></br>
        <main className="App-main">
          <section id="home" class="home-section">
            {/* landing page of website */}
            <h1>COMP90024 Project 2 - Twitter Analytics</h1>
            <br></br>
            <h3>Introduction</h3>
            <br></br>
            <p>abcd some text about welcome to our project</p>
          </section>

          <section id="team" class="team-section">
            {/* section for some info about the team */}
            <h3>Team 55</h3>
            <br></br>
            <div class="team-list-wrapper">
              <ul>
                <h4>Jin</h4>
                <p>___@student.unimelb.edu.au</p>
                <h4>Cheng Wang</h4>
                <p>___@student.unimelb.edu.au</p>
                <h4>Yingrui</h4>
                <p>___@student.unimelb.edu.au</p>
                <h4>Jacky</h4>
                <p>___@student.unimelb.edu.au</p>
                <h4>Mustafa Awni</h4>
                <p>mawni@student.unimelb.edu.au</p>
              </ul>
            </div>
          </section>

          <section id="results" class="results-section">
            {/* section for the actual data of the project */}
            <h3>Results</h3>
            <p>Scenario 1</p>
            <ScenarioButton name="Scenario 1"></ScenarioButton>
            <p>Scenario 2</p>
            <ScenarioButton name="Scenario 2"></ScenarioButton>
            <p>Scenario 3</p>
            <ScenarioButton name="Scenario 3"></ScenarioButton>
            <p>Scenario 4</p>
            <ScenarioButton name="Scenario 4"></ScenarioButton>
            <br></br>
          </section>
          
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </main>
        
      </div>
    </body>
  );
}

export default App;
