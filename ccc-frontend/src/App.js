//import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'; //import to make component classes
import axios from 'axios'; //import to use axios package --> for http requests

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
          <p style={{fontSize : "10px"}}>{this.state.result}</p>
          <br></br>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1903.9269464077704!2d10.749395743221154!3d47.556905181403664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc8a6866bd39dbba3!2sNeuschwanstein%20Castle!5e0!3m2!1sen!2sau!4v1618848815443!5m2!1sen!2sau"></iframe>
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
            <h3>Team Members</h3>
            <div class="team-list-wrapper">
              <ul>
                <li>Jin</li>
                <li>Cheng Wang</li>
                <li>Yingrui</li>
                <li>Jacky</li>
                <li>Mustafa Awni</li>
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
            <p>Scenario 5</p>
            <ScenarioButton name="Scenario 5"></ScenarioButton>
            <br></br>
          </section>
          

          {/* <section id="scenarios">
            <ScenarioButton name="Scenario 1"></ScenarioButton>
            <ScenarioButton name="Scenario 2"></ScenarioButton>
            <ScenarioButton name="Scenario 3"></ScenarioButton>
            <ScenarioButton name="Scenario 4"></ScenarioButton>
            <ScenarioButton name="Scenario 5"></ScenarioButton>
          </section> */}
          
          {/* https://github.com/mawni/CityAnalytics */}
          {/* <section id="scenarios">
            <h3>Scenario 1</h3>
            <h3>Scenario 2</h3>
            <h3>Scenario 3</h3>
            <h3>Scenario 4</h3>
            <h3>Scenario 5</h3>
          </section> */}
          {/* <img src={logo} className="App-logo" alt="logo"/> */}
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p> */}
          {/* <TestHeader name="test lol"></TestHeader> */}
          
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
