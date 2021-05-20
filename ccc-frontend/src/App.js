//import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import axios from 'axios';

// function TestHeader(props){
//   return <h1>{props.name}</h1>
// }


class ScenarioButton extends Component {
  constructor(props){
    super(props);
    this.doRequest = this.doRequest.bind(this);
    this.state = {
      result: null
    };
  }

  doRequest(){
    //this function executes when button being clicked
    //alert('Hello there o7');

    //https://attacomsian.com/blog/http-requests-axios 
    //requests with parameters. do axios.get("__url__" + this.props.queryParam), then pass in the prop at instantiation

    axios.get("https://jsonplaceholder.typicode.com/users").then(resp => {
      console.log(resp.data);
      this.setState({result:JSON.stringify(resp.data)});
    });
    // return (
    //   <h1>TEST</h1>
    // )
  }

  render() {
    return (
      <div>
        <button onClick={this.doRequest}>
          {this.props.name}
        </button>
        <p>{this.state.result}</p>
      </div>
    )
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
