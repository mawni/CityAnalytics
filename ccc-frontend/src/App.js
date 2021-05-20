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

    axios.get("https://jsonplaceholder.typicode.com/users").then(resp => {
      console.log(resp.data);
      this.setState({result:JSON.stringify(resp.data)});
      this.handleHide();
    });
    // return (
    //   <h1>TEST</h1>
    // )
  }

  render() {
    if (this.state.isActive){
      return (
        <div>
          <button onClick={this.doRequest}>
            Hide {this.props.name}
          </button>
          <p style={{fontSize : "10px"}}>{this.state.result}</p>
        </div>
      )
    } else /* isActive == false */ {
      return (
        <div>
          <button onClick={this.handleShow}>
            Show {this.props.name}
          </button>
        </div>
      )
    }
  }
}

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
                {/* <li><a href="#about">Data</a></li> */}
                <li><a href="https://github.com/mawni/CityAnalytics">GitHub</a></li>
              </ul>
            </div>
          </div>
        </nav> 
        <main className="App-header">
          <h1>City Twitter Analytics</h1>
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
